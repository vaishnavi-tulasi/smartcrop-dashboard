package com.smartcrop.croprisksystem.service;

import com.smartcrop.croprisksystem.model.CropDisease;
import com.smartcrop.croprisksystem.repository.CropDiseaseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class CropDiseaseService {

    @Autowired
    private CropDiseaseRepository cropDiseaseRepository;

    // 🔍 Detect Disease (UPDATED LOGIC)
    public CropDisease detectDisease(String cropName, MultipartFile file) {

        // ✅ Debug logs
        System.out.println("NEW CODE RUNNING");
        System.out.println("Crop: " + cropName);
        System.out.println("File: " + file.getOriginalFilename());

        String disease;
        String recommendation;

        // 🔥 LOGIC BASED ONLY ON CROP NAME (NOT FILE NAME)

        if (cropName.equalsIgnoreCase("rice")) {
            disease = "Leaf Blast";
            recommendation = "Use fungicide spray and resistant varieties";
        } 
        else if (cropName.equalsIgnoreCase("tomato")) {
            disease = "Early Blight";
            recommendation = "Apply copper-based fungicide";
        } 
        else if (cropName.equalsIgnoreCase("wheat")) {
            disease = "Yellow Rust";
            recommendation = "Use resistant seeds and apply fungicide";
        } 
        else if (cropName.equalsIgnoreCase("maize")) {
            disease = "Leaf Spot";
            recommendation = "Use proper crop rotation and fungicide";
        } 
        else {
            disease = "General Disease Detected";
            recommendation = "Consult agricultural expert";
        }

        // ✅ Create object
        CropDisease result = new CropDisease();
        result.setCropName(cropName);
        result.setDiseaseName(disease);
        result.setRecommendation(recommendation);

        // ✅ Save to DB
        return cropDiseaseRepository.save(result);
    }

    // 📋 Get all previous detections
    public List<CropDisease> getAllDetections() {
        return cropDiseaseRepository.findAll();
    }
}
