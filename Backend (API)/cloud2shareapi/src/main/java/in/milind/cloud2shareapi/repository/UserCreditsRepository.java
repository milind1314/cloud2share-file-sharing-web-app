package in.milind.cloud2shareapi.repository;

import in.milind.cloud2shareapi.document.UserCredits;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCreditsRepository extends MongoRepository<UserCredits, String> {
    Optional<UserCredits> findByClerkId(String clerkId);
}
