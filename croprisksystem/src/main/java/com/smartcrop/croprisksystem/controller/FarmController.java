package com.smartcrop.croprisksystem.controller;

import com.smartcrop.croprisksystem.model.Farm;
import com.smartcrop.croprisksystem.service.FarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farms")
@CrossOrigin(origins = "http://localhost:5173")
public class FarmController {

    @Autowired
    private FarmService farmService;

    @PostMapping
    public Farm createFarm(@RequestBody Farm farm){
        return farmService.createFarm(farm);
    }

    @GetMapping
    public List<Farm> getAllFarms(){
        return farmService.getAllFarms();
    }

    @GetMapping("/{id}")
    public Farm getFarm(@PathVariable Long id){
        return farmService.getFarmById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteFarm(@PathVariable Long id){
        farmService.deleteFarm(id);
        return "Farm deleted successfully";
    }
}