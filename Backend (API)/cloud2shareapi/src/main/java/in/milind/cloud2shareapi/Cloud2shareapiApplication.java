package in.milind.cloud2shareapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class Cloud2shareapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(Cloud2shareapiApplication.class, args);
	}

}
