package com.smartcrop.croprisksystem.model;

public class WeatherData {

    private String cropName;
    private String location;
    private double temperature;
    private double rainfall;
    private double humidity;

    public String getCropName() { return cropName; }

    public void setCropName(String cropName) { this.cropName = cropName; }

    public String getLocation() { return location; }

    public void setLocation(String location) { this.location = location; }

    public double getTemperature() { return temperature; }

    public void setTemperature(double temperature) { this.temperature = temperature; }

    public double getRainfall() { return rainfall; }

    public void setRainfall(double rainfall) { this.rainfall = rainfall; }

    public double getHumidity() { return humidity; }

    public void setHumidity(double humidity) { this.humidity = humidity; }
}