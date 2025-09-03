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
}
