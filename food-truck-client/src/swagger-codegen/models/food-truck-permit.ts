/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
 * 
 * @export
 * @interface FoodTruckPermit
 */
export interface FoodTruckPermit {
    /**
     * 
     * @type {number}
     * @memberof FoodTruckPermit
     */
    objectid: number;
    /**
     * 
     * @type {string}
     * @memberof FoodTruckPermit
     */
    applicant: string;
    /**
     * 
     * @type {string}
     * @memberof FoodTruckPermit
     */
    status: string;
    /**
     * 
     * @type {string}
     * @memberof FoodTruckPermit
     */
    fooditems?: string;
    /**
     * 
     * @type {string}
     * @memberof FoodTruckPermit
     */
    facilitytype?: string;
    /**
     * 
     * @type {string}
     * @memberof FoodTruckPermit
     */
    locationdescription?: string;
    /**
     * 
     * @type {string}
     * @memberof FoodTruckPermit
     */
    address?: string;
    /**
     * 
     * @type {string}
     * @memberof FoodTruckPermit
     */
    permit?: string;
    /**
     * 
     * @type {number}
     * @memberof FoodTruckPermit
     */
    latitude?: number;
    /**
     * 
     * @type {number}
     * @memberof FoodTruckPermit
     */
    longitude?: number;
}
