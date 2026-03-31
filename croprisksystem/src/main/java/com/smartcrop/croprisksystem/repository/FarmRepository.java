package com.smartcrop.croprisksystem.repository;

import com.smartcrop.croprisksystem.model.Farm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmRepository extends JpaRepository<Farm, Long> {

}