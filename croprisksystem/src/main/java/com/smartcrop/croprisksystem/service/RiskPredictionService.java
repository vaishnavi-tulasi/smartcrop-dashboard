package com.smartcrop.croprisksystem.service;

import org.springframework.stereotype.Service;

@Service
public class RiskPredictionService {

    public String predictRisk(double rainfall, double temperature, double soilMoisture) {

        if (rainfall < 50 && temperature > 35) {
            return "HIGH RISK: Drought conditions";
        } 
        else if (rainfall > 200 && soilMoisture > 80) {
            return "HIGH RISK: Flood conditions";
        } 
        else if (temperature < 10) {
            return "MEDIUM RISK: Cold stress";
        } 
        else {
            return "LOW RISK: Suitable conditions";
        }
    }
}