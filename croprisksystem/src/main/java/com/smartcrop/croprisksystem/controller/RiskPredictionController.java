//package com.smartcrop.croprisksystem.controller;
//
//import com.smartcrop.croprisksystem.dto.RiskRequest;
//import com.smartcrop.croprisksystem.service.RiskPredictionService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/risk")
//@CrossOrigin(origins = "*") 
//public class RiskPredictionController {
//
//    @Autowired
//    private RiskPredictionService riskPredictionService;
//
//    @PostMapping("/predict")
//    public String predictRisk(@RequestBody RiskRequest request) {
//
//        return riskPredictionService.predictRisk(
//                request.getRainfall(),
//                request.getTemperature(),
//                request.getSoilMoisture()
//        );
//    }
//