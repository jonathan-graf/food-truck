package com.jongraf.foodtruckserver.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.jongraf.foodtruckserver.model.CountAlias;
import com.jongraf.foodtruckserver.model.FoodTruckPermit;
import com.jongraf.foodtruckserver.model.StatusType;

/**
 * REST APIs using the SODA SoQL interface for Open Data
 * for San Francisco Food Truck Permits
 * 
 * @author jongraf
 *
 */
@RestController
public class SodaApiController {
  
  @Autowired
  private RestTemplate restTemplate;
  
  @Value("${api.base.url}")
  private String apiBaseUrl;
  
  @Value("${api.dataset.identifier}")
  private String apiDatasetIdentifier;
  
  private String getApiUrl() {
    return apiBaseUrl + "/" + apiDatasetIdentifier + ".json";
  }
  
  private Integer count(String query) {
    return restTemplate.getForObject(getApiUrl() + "?$select=count(*) as countalias" + (query != null ? " " + query.replace("where=", "where") : ""), CountAlias[].class)[0].countalias();
  }
  /**
   * Used for the Dashboard UI
   * 
   * @param size
   * @param page
   * @return
   */
  @GetMapping("/permits")
  public PageImpl<FoodTruckPermit> getAllFoodTruckPermits(@RequestParam int size, @RequestParam int page) {
    List<FoodTruckPermit> foodTruckPermits = null;
    // Get get this automatically serialized into a set of Java Beans annotated with Jackson JSON annotations
    String paginationClause = generatePaginationClause(size, page);
    FoodTruckPermit[] array = restTemplate.getForObject(getApiUrl() + "?" + paginationClause, FoodTruckPermit[].class);
    foodTruckPermits = Arrays.asList(array);
    
    Integer count = count(null);
    return new PageImpl<FoodTruckPermit>(foodTruckPermits, PageRequest.of(page, size), count);
  }

  /**
   * Reusable paginaton string generator
   * 
   * @param size
   * @param page
   * @return
   */
  private String generatePaginationClause(int size, int page) {
    String paginationClause = "&$limit=" + size + "&$offset=" + page * size + "&$order=objectid";
    return paginationClause;
  }
  
  @GetMapping("/permits/{id}")
  public FoodTruckPermit getFoodTruckPermitById(@PathVariable long id) {
    FoodTruckPermit foodTruckPermit = null;
    FoodTruckPermit[] response = restTemplate.getForObject(getApiUrl() + "?" + "objectid=" + id + "&$order=objectid", FoodTruckPermit[].class);

    if (response.length != 1) {
      throw new FoodTruckPermitNotFoundException(id);
    } else {
      foodTruckPermit = response[0];  // We only need the first one, y'all
      return foodTruckPermit;
    }      
  }

  @GetMapping("/permits/search/{input}/status/{statusInput}")
  public PageImpl<FoodTruckPermit> searchFoodTruckPermitByTextAndStatus(@PathVariable String input, 
    @PathVariable StatusType[] statusInput, @RequestParam int size, @RequestParam int page) {
    List<FoodTruckPermit> foodTruckPermits = null;   
    String statusClause = null;    
    String textSearchClause = "";
    
    String[] fieldNames = {"FOODITEMS", "APPLICANT"};

    for (int i = 0; i < fieldNames.length; i++) {      
      textSearchClause += "lower(" + fieldNames[i] + ") + LIKE '%" + input + "%'" + (i != fieldNames.length - 1 ? " OR " : ""); 
    }
    
    statusClause = generateStatusClause(statusInput, statusClause);

    String query = "where=(" + textSearchClause + ")" + (statusClause != null ? " AND " + statusClause : "");
    String httpGet = getApiUrl() + "?$" + query + generatePaginationClause(size, page);
    
    FoodTruckPermit[] array = restTemplate.getForObject(httpGet, FoodTruckPermit[].class);
    foodTruckPermits = Arrays.asList(array);
    
    Integer count = count(query);  
    return new PageImpl<FoodTruckPermit>(foodTruckPermits, PageRequest.of(page, size), count);
  }

  private String generateStatusClause(StatusType[] statusInput, String statusClause) {
    List<StatusType> statusArrayList = Arrays.asList(statusInput);
    if (!statusArrayList.contains(StatusType.ALL)) {
      statusClause = " status IN (";
      for (int i = 0; i < statusInput.length; i++) {
         statusClause += "'" + statusInput[i].toString() + "'" + (i < statusInput.length -1 ? ", " : "");
      };
      statusClause += ")";
    }
    return statusClause;
  }
  
  @GetMapping("/permits/status/{statusInput}")
  public PageImpl<FoodTruckPermit> searchFoodTruckPermitByStatus(@PathVariable StatusType[] statusInput,
    @RequestParam int size, @RequestParam int page) {
    List<FoodTruckPermit> foodTruckPermits = null;   
    String statusClause = null;    
        
    statusClause = generateStatusClause(statusInput, statusClause);

    String query = "where=" + statusClause;
    String httpGet = getApiUrl() + "?$" + query + generatePaginationClause(size, page);
    
    FoodTruckPermit[] array = restTemplate.getForObject(httpGet, FoodTruckPermit[].class);
    foodTruckPermits = Arrays.asList(array);
    
    Integer count = count(query);  
    return new PageImpl<FoodTruckPermit>(foodTruckPermits, PageRequest.of(page, size), count);
  }
  
  /**
   * The SoQL database allows for a search engine-style search with a "q" param
   * 
   * @param input
   * @return
   */
  @GetMapping("/permits/search/{input}")
  public PageImpl<FoodTruckPermit> searchFoodTruckPermit(@PathVariable String input) {
    List<FoodTruckPermit> foodTruckPermits = null;   

    String httpGet = getApiUrl() + "?$q=" + input;
    
    FoodTruckPermit[] array = restTemplate.getForObject(httpGet, FoodTruckPermit[].class);
    foodTruckPermits = Arrays.asList(array);
    
    return new PageImpl<FoodTruckPermit>(foodTruckPermits, Pageable.unpaged(), foodTruckPermits.size());
  }
}
