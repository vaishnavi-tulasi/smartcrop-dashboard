package com.smartcrop.croprisksystem.service;

import org.springframework.stereotype.Service;
import com.smartcrop.croprisksystem.model.WeatherData;

@Service
public class RiskAnalysisService {

    public String analyzeRisk(WeatherData weather) {

        if(weather.getTemperature() > 40)
            return "HIGH RISK - Temperature too high";

        if(weather.getRainfall() < 50)
            return "HIGH RISK - Not enough rainfall";

        if(weather.getHumidity() < 30)
            return "MEDIUM RISK - Low humidity";

        return "LOW RISK - Good conditions for crops";
    }
}