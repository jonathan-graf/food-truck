package com.jongraf.foodtruckserver.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class FoodTruckPermitNotFoundAdvice {
  @ExceptionHandler(FoodTruckPermitNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  String foodTruckPermitNotFoundHandler(FoodTruckPermitNotFoundException ex) {
    return ex.getMessage();
  }
}
