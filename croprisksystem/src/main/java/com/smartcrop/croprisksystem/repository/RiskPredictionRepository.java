package com.smartcrop.croprisksystem.repository;

import com.smartcrop.croprisksystem.model.RiskPrediction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RiskPredictionRepository extends JpaRepository<RiskPrediction, Long> {

    // Query predictions by username of linked user
    List<RiskPrediction> findByUser_Username(String username);
}