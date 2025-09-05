package in.milind.cloud2shareapi.repository;

import in.milind.cloud2shareapi.document.FileMetadataDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileMetadataRepository extends MongoRepository<FileMetadataDocument,String> {
    List<FileMetadataDocument> findByClerkId(String clerkId);

    Long countByClerkId(String clerkId);
}
