package com.smartcrop.croprisksystem.config;

import com.smartcrop.croprisksystem.model.User;
import com.smartcrop.croprisksystem.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if(userRepository.count() == 0) {

            // Admin
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword("admin123");
            admin.setEmail("admin@gmail.com");
            admin.setFullName("Administrator");
            admin.setContactNumber("9999999999");
            userRepository.save(admin);


            // User 1
            User user1 = new User();
            user1.setUsername("farmer1");
            user1.setPassword("farmer123");
            user1.setEmail("heyyyhellooo456@gmail.com");
            user1.setFullName("First Farmer");
            user1.setContactNumber("8888888888");
            userRepository.save(user1);


            // User 2
            User user2 = new User();
            user2.setUsername("farmer2");
            user2.setPassword("farmer123");
            user2.setEmail("farmer2@gmail.com");
            user2.setFullName("Suresh Farmer");
            user2.setContactNumber("8888888882");
            userRepository.save(user2);


            // User 3
            User user3 = new User();
            user3.setUsername("farmer3");
            user3.setPassword("farmer123");
            user3.setEmail("farmer3@gmail.com");
            user3.setFullName("Mahesh Farmer");
            user3.setContactNumber("8888888883");
            userRepository.save(user3);


            // User 4
            User user4 = new User();
            user4.setUsername("farmer4");
            user4.setPassword("farmer123");
            user4.setEmail("farmer4@gmail.com");
            user4.setFullName("Lakshmi Farmer");
            user4.setContactNumber("8888888884");
            userRepository.save(user4);


            System.out.println("Users successfully preloaded into H2 database.");
        }
    }
}