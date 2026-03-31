package com.smartcrop.croprisksystem.repository; // ✅ must match folder

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.smartcrop.croprisksystem.model.User;
import java.util.Optional;

@Repository // ✅ optional but can help Spring detect
public interface AuthRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}