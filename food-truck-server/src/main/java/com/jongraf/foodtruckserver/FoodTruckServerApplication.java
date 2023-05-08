package com.jongraf.foodtruckserver;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class FoodTruckServerApplication {

  @Value("${cors.urls}")
  private String corsUrls;
  
  @Bean
  public RestTemplate restTemplate(RestTemplateBuilder builder) {
    return builder.build();
  }
  
  @Bean
  public WebMvcConfigurer corsConfigurer() {
        
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/permits/**").allowedOrigins(corsUrls);
      }
    };
  }

	public static void main(String[] args) {
		SpringApplication.run(FoodTruckServerApplication.class, args);
	}

}
