//package com.smartcrop.croprisksystem.controller;
//
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/weather")
//@CrossOrigin(origins = "http://localhost:5173")
//public class WeatherController {
//
//    private final String API_KEY = "4cc558098bb5ec97ab58e57dfa55bd2b"; // 🔥 PUT YOUR KEY HERE
//
//    @GetMapping
//    public Map<String, Object> getWeather(@RequestParam String city) {
//
//        Map<String, Object> response = new HashMap<>();
//
//        try {
//            String url = "https://api.openweathermap.org/data/2.5/weather?q="
//                    + city + "&appid=" + API_KEY + "&units=metric";
//
//            RestTemplate restTemplate = new RestTemplate();
//            Map data = restTemplate.getForObject(url, Map.class);
//
//            Map main = (Map) data.get("main");
//
//            response.put("temperature", main.get("temp"));
//            response.put("humidity", main.get("humidity"));
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            response.put("temperature", "N/A");
//            response.put("humidity", "N/A");
//        }
//
//        return response;
//    }
//}
package com.smartcrop.croprisksystem.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "http://localhost:5173")
public class WeatherController {

    private final String API_KEY = "4cc558098bb5ec97ab58e57dfa55bd2b"; // put your key

    @GetMapping
    public Map<String, Object> getWeather(@RequestParam String city) {

        Map<String, Object> response = new HashMap<>();

        try {
            String url = "https://api.openweathermap.org/data/2.5/weather?q="
                    + city + "&appid=" + API_KEY + "&units=metric";

            RestTemplate restTemplate = new RestTemplate();
            Map data = restTemplate.getForObject(url, Map.class);

            Map main = (Map) data.get("main");

            response.put("temperature", main.get("temp"));
            response.put("humidity", main.get("humidity"));

        } catch (Exception e) {
            response.put("temperature", "N/A");
            response.put("humidity", "N/A");
        }

        return response;
    }
}