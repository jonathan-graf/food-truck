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
import { ContextError } from './context-error';
import { KeyValues } from './key-values';
import { ObservationView } from './observation-view';
/**
 * 
 * @export
 * @interface Context
 */
export interface Context {
    /**
     * 
     * @type {string}
     * @memberof Context
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof Context
     */
    contextualName?: string;
    /**
     * 
     * @type {ContextError}
     * @memberof Context
     */
    error?: ContextError;
    /**
     * 
     * @type {ObservationView}
     * @memberof Context
     */
    parentObservation?: ObservationView;
    /**
     * 
     * @type {KeyValues}
     * @memberof Context
     */
    lowCardinalityKeyValues: KeyValues;
    /**
     * 
     * @type {KeyValues}
     * @memberof Context
     */
    highCardinalityKeyValues: KeyValues;
    /**
     * 
     * @type {KeyValues}
     * @memberof Context
     */
    allKeyValues: KeyValues;
}