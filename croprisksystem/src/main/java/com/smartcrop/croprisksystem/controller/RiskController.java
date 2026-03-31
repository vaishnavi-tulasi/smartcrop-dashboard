//package com.smartcrop.croprisksystem.controller;
//
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//
//import java.util.*;
//
//@RestController
//@RequestMapping("/api/risk")
//@CrossOrigin(origins = "http://localhost:5173") // ✅ safe, no conflict
//public class RiskController {
//
//    // ✅ EMAIL SENDER (IMPORTANT)
//    @Autowired
//    private JavaMailSender mailSender;
//
//    // In-memory storage
//    private final List<Map<String, Object>> dataList = new ArrayList<>();
//
//    // ✅ TEST API
//    @GetMapping("/test")
//    public String test() {
//        return "Risk API Working!";
//    }
//
//    // ✅ ROOT CHECK
//    @GetMapping("")
//    public String root() {
//        return "Risk API Root Working!";
//    }
//
//    // ✅ PREDICT API
//    @PostMapping("/predict")
//    public Map<String, Object> predict(@RequestBody Map<String, Object> payload) {
//
//        Map<String, Object> response = new HashMap<>();
//
//        try {
//            double temp = Double.parseDouble(payload.get("temperature").toString());
//            double rainfall = Double.parseDouble(payload.get("rainfall").toString());
//
//            String risk;
//
//            if (temp > 35 || rainfall < 50) {
//                risk = "HIGH";
//            } else if (temp > 25) {
//                risk = "MEDIUM";
//            } else {
//                risk = "LOW";
//            }
//
//            payload.put("riskLevel", risk);
//            dataList.add(payload);
//
//            response.put("status", "success");
//            response.put("data", payload);
//
//        } catch (Exception e) {
//            response.put("status", "error");
//            response.put("message", "Invalid input!");
//        }
//
//        return response;
//    }
//
//    // ✅ REAL EMAIL FEATURE (UPDATED 🔥)
//    @PostMapping("/send-email")
//    public String sendEmail(@RequestBody Map<String, String> data) {
//
//        try {
//            String toEmail = data.get("email");
//
//            SimpleMailMessage message = new SimpleMailMessage();
//            message.setTo(toEmail);
//            message.setSubject("Crop Risk Result 🌾");
//            message.setText("Hello Farmer,\n\nYour crop risk prediction is ready.\n\nThank you!");
//
//            mailSender.send(message);
//
//            System.out.println("✅ Email sent to: " + toEmail);
//
//            return "Email sent successfully!";
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "❌ Failed to send email!";
//        }
//    }
//
//    // ✅ GET ALL DATA
//    @GetMapping("/all")
//    public List<Map<String, Object>> getAll() {
//        return dataList;
//    }
//
//    // ✅ IMAGE UPLOAD API
//    @PostMapping("/upload")
//    public Map<String, Object> uploadFile(@RequestParam("file") MultipartFile file) {
//
//        Map<String, Object> response = new HashMap<>();
//
//        try {
//            response.put("status", "success");
//            response.put("message", "File uploaded successfully!");
//            response.put("fileName", file.getOriginalFilename());
//
//        } catch (Exception e) {
//            response.put("status", "error");
//            response.put("message", "Upload failed!");
//        }
//
//        return response;
//    }
//}
//package com.smartcrop.croprisksystem.controller;
//
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//
//import java.util.*;
//
//@RestController
//@RequestMapping("/api/risk")
//@CrossOrigin(origins = "http://localhost:5173")
//public class RiskController {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    private final List<Map<String, Object>> dataList = new ArrayList<>();
//
//    // ✅ TEST
//    @GetMapping("/test")
//    public String test() {
//        return "Risk API Working!";
//    }
//
//    // ✅ PREDICT + AUTO EMAIL 🔥
//    @PostMapping("/predict")
//    public Map<String, Object> predict(@RequestBody Map<String, Object> payload) {
//
//        Map<String, Object> response = new HashMap<>();
//
//        try {
//            double temp = Double.parseDouble(payload.get("temperature").toString());
//            double rainfall = Double.parseDouble(payload.get("rainfall").toString());
//
//            String email = payload.get("email").toString(); // ✅ get email from frontend
//
//            String risk;
//
//            if (temp > 35 || rainfall < 50) {
//                risk = "HIGH";
//            } else if (temp > 25) {
//                risk = "MEDIUM";
//            } else {
//                risk = "LOW";
//            }
//
//            payload.put("riskLevel", risk);
//            dataList.add(payload);
//
//            // ✅ 🔥 AUTO EMAIL WHEN HIGH RISK
//            if (risk.equalsIgnoreCase("HIGH")) {
//
//                SimpleMailMessage message = new SimpleMailMessage();
//                message.setTo(email);
//                message.setSubject("⚠️ HIGH Crop Risk Alert!");
//
//                message.setText(
//                        "Hello Farmer,\n\n" +
//                        "⚠️ HIGH RISK detected for your crop.\n\n" +
//                        "Temperature: " + temp + "°C\n" +
//                        "Rainfall: " + rainfall + "mm\n\n" +
//                        "👉 Please take immediate action!\n\n" +
//                        "Smart Crop Risk System 🌾"
//                );
//
//                mailSender.send(message);
//
//                System.out.println("✅ ALERT EMAIL SENT!");
//            }
//
//            response.put("status", "success");
//            response.put("data", payload);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            response.put("status", "error");
//            response.put("message", "Invalid input!");
//        }
//
//        return response;
//    }
//
//    // ✅ GET ALL
//    @GetMapping("/all")
//    public List<Map<String, Object>> getAll() {
//        return dataList;
//    }
//
//    // ✅ OPTIONAL UPLOAD
//    @PostMapping("/upload")
//    public Map<String, Object> uploadFile(@RequestParam("file") MultipartFile file) {
//
//        Map<String, Object> response = new HashMap<>();
//
//        try {
//            response.put("status", "success");
//            response.put("message", "File uploaded successfully!");
//            response.put("fileName", file.getOriginalFilename());
//
//        } catch (Exception e) {
//            response.put("status", "error");
//            response.put("message", "Upload failed!");
//        }
//
//        return response;
//    }
//}
//package com.smartcrop.croprisksystem.controller;
//
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//
//import java.util.*;
//
//@RestController
//@RequestMapping("/api/risk")
//@CrossOrigin(origins = "http://localhost:5173")
//public class RiskController {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    private final List<Map<String, Object>> dataList = new ArrayList<>();
//
//    @GetMapping("/test")
//    public String test() {
//        return "Risk API Working!";
//    }
//
//    // ✅ PREDICT + AUTO EMAIL
//    @PostMapping("/predict")
//    public Map<String, Object> predict(@RequestBody Map<String, Object> payload) {
//
//        Map<String, Object> response = new HashMap<>();
//
//        try {
//            double temp = Double.parseDouble(payload.get("temperature").toString());
//            double rainfall = Double.parseDouble(payload.get("rainfall").toString());
//            String email = payload.get("email").toString();
//
//            String risk;
//
//            if (temp > 35 || rainfall < 50) {
//                risk = "HIGH";
//            } else if (temp > 25) {
//                risk = "MEDIUM";
//            } else {
//                risk = "LOW";
//            }
//
//            payload.put("riskLevel", risk);
//            dataList.add(payload);
//
//            // ✅ AUTO EMAIL
//            if (risk.equalsIgnoreCase("HIGH")) {
//                SimpleMailMessage message = new SimpleMailMessage();
//                message.setTo(email);
//                message.setSubject("⚠️ HIGH Crop Risk Alert!");
//                message.setText(
//                        "Temperature: " + temp + "°C\n" +
//                        "Rainfall: " + rainfall + "mm\n\n" +
//                        "⚠️ HIGH RISK detected! Take action."
//                );
//                mailSender.send(message);
//                System.out.println("✅ EMAIL SENT");
//            }
//
//            // ✅ IMPORTANT RESPONSE
//            response.put("riskLevel", risk);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            response.put("riskLevel", "ERROR");
//        }
//
//        return response;
//    }
//
//    @GetMapping("/all")
//    public List<Map<String, Object>> getAll() {
//        return dataList;
//    }
//
//    @PostMapping("/upload")
//    public Map<String, Object> uploadFile(@RequestParam("file") MultipartFile file) {
//
//        Map<String, Object> response = new HashMap<>();
//
//        try {
//            response.put("status", "success");
//            response.put("fileName", file.getOriginalFilename());
//        } catch (Exception e) {
//            response.put("status", "error");
//        }
//
//        return response;
//    }
//}
package com.smartcrop.croprisksystem.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.*;

@RestController
@RequestMapping("/api/risk")
@CrossOrigin(origins = "http://localhost:5173")
public class RiskController {

    @Autowired
    private JavaMailSender mailSender;

    private final List<Map<String, Object>> dataList = new ArrayList<>();

    @GetMapping("/test")
    public String test() {
        return "Risk API Working!";
    }

    // ✅ PREDICT + AUTO EMAIL
    @PostMapping("/predict")
    public Map<String, Object> predict(@RequestBody Map<String, Object> payload) {

        Map<String, Object> response = new HashMap<>();

        try {
            double temp = Double.parseDouble(payload.get("temperature").toString());
            double rainfall = Double.parseDouble(payload.get("rainfall").toString());
            String email = payload.get("email").toString();

            String risk;

            if (temp > 35 || rainfall < 50) {
                risk = "HIGH";
            } else if (temp > 25) {
                risk = "MEDIUM";
            } else {
                risk = "LOW";
            }

            payload.put("riskLevel", risk);
            dataList.add(payload);

            // ✅ AUTO EMAIL
            if (risk.equalsIgnoreCase("HIGH")) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(email);
                message.setSubject("⚠️ HIGH Crop Risk Alert!");
                message.setText(
                        "Temperature: " + temp + "°C\n" +
                        "Rainfall: " + rainfall + "mm\n\n" +
                        "⚠️ HIGH RISK detected! Take action."
                );
                mailSender.send(message);
                System.out.println("✅ EMAIL SENT");
            }

            response.put("riskLevel", risk);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("riskLevel", "ERROR");
        }

        return response;
    }

    @GetMapping("/all")
    public List<Map<String, Object>> getAll() {
        return dataList;
    }

    // ✅ UPDATED IMAGE UPLOAD (RETURNS DISEASE NAME)
    @PostMapping("/upload")
    public Map<String, Object> uploadFile(@RequestParam("file") MultipartFile file) {

        Map<String, Object> response = new HashMap<>();

        try {
            // 👉 Dummy disease detection logic (replace later with ML)
            String fileName = file.getOriginalFilename().toLowerCase();
            String disease;

            if (fileName.contains("leaf")) {
                disease = "Leaf Spot Disease";
            } else if (fileName.contains("yellow")) {
                disease = "Yellow Rust";
            } else if (fileName.contains("blight")) {
                disease = "Blight Disease";
            } else {
                disease = "Healthy Crop";
            }

            response.put("disease", disease); // ✅ IMPORTANT CHANGE
            response.put("fileName", file.getOriginalFilename());

        } catch (Exception e) {
            response.put("disease", "Error detecting disease");
        }

        return response;
    }
}