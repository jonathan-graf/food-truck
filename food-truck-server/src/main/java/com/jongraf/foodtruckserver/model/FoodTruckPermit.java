package com.jongraf.foodtruckserver.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.validation.constraints.NotBlank;

@JsonIgnoreProperties(ignoreUnknown = true)
public record FoodTruckPermit(
    @NotBlank long objectid, 
    @NotBlank String applicant,
    @NotBlank String status,
    String fooditems,
    String facilitytype,
    String locationdescription,
    String address,
    String permit,
    float latitude,
    float longitude
  ) { }
