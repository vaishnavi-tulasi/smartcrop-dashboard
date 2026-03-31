package com.smartcrop.croprisksystem.controller;

import com.smartcrop.croprisksystem.model.CropDisease;
import com.smartcrop.croprisksystem.service.CropDiseaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/disease")
@CrossOrigin(origins = "http://localhost:5173")
public class CropDiseaseController {

    @Autowired
    private CropDiseaseService cropDiseaseService;

    // ✅ DETECT DISEASE (FIXED)
    @PostMapping("/detect")
    public CropDisease detectDisease(
            @RequestParam("file") MultipartFile file,
            @RequestParam("cropName") String cropName) {

        System.out.println("API HIT SUCCESS ✅");
        return cropDiseaseService.detectDisease(cropName, file);
    }

    // ✅ GET ALL DATA (FIXED URL)
    @GetMapping("/all")
    public List<CropDisease> getAllDetections() {

        System.out.println("GET ALL CALLED ✅");
        return cropDiseaseService.getAllDetections();
    }
}