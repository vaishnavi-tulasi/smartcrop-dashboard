package com.smartcrop.croprisksystem.controller;

import com.smartcrop.croprisksystem.model.CropRecommendation;
import com.smartcrop.croprisksystem.service.CropRecommendationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendation")
@CrossOrigin(origins = "http://localhost:5173")
public class CropRecommendationController {

    @Autowired
    private CropRecommendationService cropRecommendationService;

    @PostMapping
    public CropRecommendation recommendCrop(@RequestBody CropRecommendation request) {

        return cropRecommendationService.recommendCrop(request);
    }
}