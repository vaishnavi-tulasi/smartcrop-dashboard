package com.smartcrop.croprisksystem.controller;

import com.smartcrop.croprisksystem.model.Crop;
import com.smartcrop.croprisksystem.service.CropService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
@CrossOrigin(origins = "http://localhost:5173") 
public class CropController {

    @Autowired
    private CropService cropService;

    // Create crop
    @PostMapping
    public Crop createCrop(@RequestBody Crop crop) {
        return cropService.createCrop(crop);
    }

    // Get all crops
    @GetMapping
    public List<Crop> getAllCrops() {
        return cropService.getAllCrops();
    }

    // Get crop by id
    @GetMapping("/{id}")
    public Crop getCrop(@PathVariable Long id) {
        return cropService.getCropById(id);
    }

    // Delete crop
    @DeleteMapping("/{id}")
    public String deleteCrop(@PathVariable Long id) {
        cropService.deleteCrop(id);
        return "Crop deleted successfully";
    }
}