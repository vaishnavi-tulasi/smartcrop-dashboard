package com.smartcrop.croprisksystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendRiskAlert(String email, String messageText) {

        try {

            SimpleMailMessage message = new SimpleMailMessage();

            message.setTo(email);
            message.setSubject("Crop Risk Alert");
            message.setText(messageText);

            mailSender.send(message);

            // SUCCESS MESSAGE IN CONSOLE
            System.out.println("✅ EMAIL SENT SUCCESSFULLY");
            System.out.println("📧 Email sent to: " + email);

        } catch (Exception e) {

            System.out.println("❌ EMAIL SENDING FAILED");
            e.printStackTrace();

        }

    }
}
