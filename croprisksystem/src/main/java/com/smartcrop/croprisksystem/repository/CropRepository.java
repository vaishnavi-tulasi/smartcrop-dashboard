package com.smartcrop.croprisksystem.repository;

import com.smartcrop.croprisksystem.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropRepository extends JpaRepository<Crop, Long> {

}