package in.milind.cloud2shareapi.service;

import in.milind.cloud2shareapi.document.FileMetadataDocument;
import in.milind.cloud2shareapi.document.ProfileDocument;
import in.milind.cloud2shareapi.dto.FileMetadataDTO;
import in.milind.cloud2shareapi.repository.FileMetadataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileMetadataService {

    private final FileMetadataRepository fileMetadataRepository;

    private final ProfileService profileService;

    private final UserCreditsService userCreditsService;


    public List<FileMetadataDTO> uploadFiles(MultipartFile files[]) throws IOException {

        ProfileDocument currentProfile = profileService.getCurrentProfile();

        List<FileMetadataDocument> savedFiles = new ArrayList<>();

        if (!userCreditsService.hasEnoughCredits(files.length)) {
            throw new RuntimeException("Not enough credits to uploads files, Please purchase more credits.");
        }
        Path uploadPath = Paths.get("upload").toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

        for (MultipartFile file : files){
            String fileName = UUID.randomUUID() + "." + StringUtils.getFilenameExtension(file.getOriginalFilename());
            Path targetLocation = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            FileMetadataDocument fileMetadata = FileMetadataDocument.builder()
                    .fileLocation(targetLocation.toString())
                    .name(file.getOriginalFilename())
                    .size(file.getSize())
                    .type(file.getContentType())
                    .clerkId(currentProfile.getClerkId())
                    .isPublic(false)
                    .uploadedAt(LocalDateTime.now())
                    .build();

            //TODO:consume one credit for each file upload
            userCreditsService.consumeCredit();

            savedFiles.add(fileMetadataRepository.save(fileMetadata));
        }

        return savedFiles.stream().map(fileMetadataDocument -> mapToDTO(fileMetadataDocument))
                .collect(Collectors.toList());
    }

    private FileMetadataDTO mapToDTO(FileMetadataDocument fileMetadataDocument) {
        return FileMetadataDTO.builder()
                .id(fileMetadataDocument.getId())
                .fileLocation(fileMetadataDocument.getFileLocation())
                .name(fileMetadataDocument.getName())
                .size(fileMetadataDocument.getSize())
                .type(fileMetadataDocument.getType())
                .clerkId(fileMetadataDocument.getClerkId())
                .isPublic(fileMetadataDocument.getIsPublic())
                .uploadedAt(fileMetadataDocument.getUploadedAt())
                .build();
    }

    public List<FileMetadataDTO> getFiles() {
        ProfileDocument currentProfile = profileService.getCurrentProfile();
        List<FileMetadataDocument> files = fileMetadataRepository.findByClerkId(currentProfile.getClerkId());
        return files.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public FileMetadataDTO getPublicFiles(String id) {
        Optional<FileMetadataDocument> fileOptional = fileMetadataRepository.findById(id);
        if (fileOptional.isEmpty() || !fileOptional.get().getIsPublic()) {
            throw new RuntimeException("Unable to get the file");
        }
        FileMetadataDocument document = fileOptional.get();

        return mapToDTO(document);
    }

    public FileMetadataDTO getDownloadableFile(String id) {
        FileMetadataDocument file = fileMetadataRepository.findById(id).orElseThrow(() -> new RuntimeException("File not found"));
        return mapToDTO(file);
    }

    public void deleteFile(String id) {
        try {
            ProfileDocument currentProfile = profileService.getCurrentProfile();
            FileMetadataDocument file = fileMetadataRepository.findById(id).orElseThrow(()-> new RuntimeException("File not found"));
            if (!file.getClerkId().equals(currentProfile.getClerkId())) {
                throw new RuntimeException("File is not belong to current user");
            }
            Path filePath = Paths.get(file.getFileLocation());
            Files.deleteIfExists(filePath);

            fileMetadataRepository.deleteById(id);

        } catch (Exception e) {
            throw new RuntimeException("Error deleting the file");
        }
    }

    public FileMetadataDTO togglePublic(String id) {
        FileMetadataDocument file = fileMetadataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));
        file.setIsPublic(!file.getIsPublic());
        fileMetadataRepository.save(file);
        return mapToDTO(file);
    }
}
