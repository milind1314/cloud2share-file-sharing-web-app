package in.milind.cloud2shareapi.service;

import in.milind.cloud2shareapi.document.UserCredits;
import in.milind.cloud2shareapi.repository.UserCreditsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserCreditsService {

    private final UserCreditsRepository userCreditsRepository;

    private final ProfileService profileService;

    public UserCredits createInitialCredits(String clerkId) {

        Optional<UserCredits> existing = userCreditsRepository.findByClerkId(clerkId);

        if (existing.isPresent()) {
            return existing.get(); // return existing instead of creating duplicate
        }

        UserCredits userCredits = UserCredits.builder()
                .clerkId(clerkId)
                .credits(5)
                .plan("BASIC")
                .build();

        return userCreditsRepository.save(userCredits);
    }


    public UserCredits getUserCredits(String clerkId){
        return userCreditsRepository.findByClerkId(clerkId).orElseGet(() -> createInitialCredits(clerkId));
    }

    public UserCredits getUserCredits(){
        String clerkId = profileService.getCurrentProfile().getClerkId();

        return getUserCredits(clerkId);
    }

    public Boolean hasEnoughCredits(int requiredCredits){
        UserCredits userCredits = getUserCredits();
        return userCredits.getCredits() >= requiredCredits;
    }

    public UserCredits consumeCredit() {
        UserCredits userCredits = getUserCredits();
        if (userCredits.getCredits() <= 0) {
            return null;
        }
        userCredits.setCredits(userCredits.getCredits() - 1);
        return userCreditsRepository.save(userCredits);
    }
}
