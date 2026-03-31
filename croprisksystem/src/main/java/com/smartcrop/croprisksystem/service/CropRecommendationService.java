package com.smartcrop.croprisksystem.service;

import com.smartcrop.croprisksystem.model.CropRecommendation;
import org.springframework.stereotype.Service;

@Service
public class CropRecommendationService {

    public CropRecommendation recommendCrop(CropRecommendation request) {

        String soil = request.getSoilType().toLowerCase();
        double temp = request.getTemperature();
        double rain = request.getRainfall();

        String crop;

        if (soil.contains("clay") && rain > 100) {
            crop = "Rice";
        }
        else if (soil.contains("loamy") && temp < 30) {
            crop = "Wheat";
        }
        else if (soil.contains("sandy") && rain < 50) {
            crop = "Millet";
        }
        else if (temp > 30 && rain > 60) {
            crop = "Cotton";
        }
        else {
            crop = "Maize";
        }

        request.setRecommendedCrop(crop);

        return request;
    }
}
