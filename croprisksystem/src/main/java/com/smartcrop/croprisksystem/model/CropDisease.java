package com.smartcrop.croprisksystem.model;

import jakarta.persistence.*;

@Entity
public class CropDisease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cropName;
    private String diseaseName;
    private String recommendation;

    public CropDisease(){}

    public Long getId(){
        return id;
    }

    public String getCropName(){
        return cropName;
    }

    public void setCropName(String cropName){
        this.cropName = cropName;
    }

    public String getDiseaseName(){
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName){
        this.diseaseName = diseaseName;
    }

    public String getRecommendation(){
        return recommendation;
    }

    public void setRecommendation(String recommendation){
        this.recommendation = recommendation;
    }
}