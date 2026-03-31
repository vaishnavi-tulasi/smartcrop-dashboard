package com.smartcrop.croprisksystem.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    private final String API_KEY = "PASTE_YOUR_API_KEY_HERE";

    public String getWeatherData(String location) {

        String url = "https://api.openweathermap.org/data/2.5/weather?q="
                + location
                + "&appid=" + API_KEY
                + "&units=metric";

        RestTemplate restTemplate = new RestTemplate();

        try {
            return restTemplate.getForObject(url, String.class);
        } catch (Exception e) {

            // Fallback weather data if API fails
            return """
            {
              "source": "fallback",
              "location": "%s",
              "temperature": 30,
              "humidity": 65,
              "rainfall": 20,
              "message": "Using demo weather data because API failed"
            }
            """.formatted(location);
        }
    }
}