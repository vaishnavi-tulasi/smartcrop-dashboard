package com.smartcrop.croprisksystem.service;

import com.smartcrop.croprisksystem.model.Farm;
import com.smartcrop.croprisksystem.repository.FarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmService {

    @Autowired
    private FarmRepository farmRepository;

    public Farm createFarm(Farm farm) {
        return farmRepository.save(farm);
    }

    public List<Farm> getAllFarms() {
        return farmRepository.findAll();
    }

    public Farm getFarmById(Long id) {
        return farmRepository.findById(id).orElse(null);
    }

    public void deleteFarm(Long id) {
        farmRepository.deleteById(id);
    }
}