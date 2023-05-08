package com.jongraf.foodtruckserver;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.client.RestTemplate;

import org.junit.jupiter.api.Test;

import com.jongraf.foodtruckserver.controller.SodaApiController;
import com.jongraf.foodtruckserver.model.FoodTruckPermit;

@SpringBootTest
class FoodTruckServerApplicationTests {

  @Autowired
  private SodaApiController sodaApiController;
  
  @Bean
  public RestTemplate restTemplate(RestTemplateBuilder builder) {
    return builder.build();
  }
  
	@Test
	void contextLoads() {
	}
	
	@Test
	public void testFoodTruckPermitsAll(@Autowired RestTemplate restTemplate) {
	  PageImpl<FoodTruckPermit> foodTruckPermits = sodaApiController.getAllFoodTruckPermits(10, 0);
	  assertTrue(foodTruckPermits != null && foodTruckPermits.getContent().size() > 0);
	}

}
