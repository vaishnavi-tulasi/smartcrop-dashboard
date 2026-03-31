package com.smartcrop.croprisksystem.controller;

import com.smartcrop.croprisksystem.model.RiskPrediction;
import com.smartcrop.croprisksystem.repository.UserRepository;
import com.smartcrop.croprisksystem.repository.FarmRepository;
import com.smartcrop.croprisksystem.repository.CropRepository;
import com.smartcrop.croprisksystem.repository.RiskPredictionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private RiskPredictionRepository riskPredictionRepository;

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {

        Map<String, Object> stats = new HashMap<>();

        long totalUsers = userRepository.count();
        long totalFarms = farmRepository.count();
        long totalCrops = cropRepository.count();
        long totalPredictions = riskPredictionRepository.count();

        List<RiskPrediction> predictions = riskPredictionRepository.findAll();

        long highRisk = predictions.stream()
                .filter(p -> "HIGH".equalsIgnoreCase(p.getRiskLevel()))
                .count();

        long lowRisk = predictions.stream()
                .filter(p -> "LOW".equalsIgnoreCase(p.getRiskLevel()))
                .count();

        stats.put("totalUsers", totalUsers);
        stats.put("totalFarms", totalFarms);
        stats.put("totalCrops", totalCrops);
        stats.put("totalRiskPredictions", totalPredictions);
        stats.put("highRiskPredictions", highRisk);
        stats.put("lowRiskPredictions", lowRisk);

        return stats;
    }
}