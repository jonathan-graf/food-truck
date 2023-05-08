import { PageImplFoodTruckPermit, SodaApiControllerApi } from "../swagger-codegen";

const sodaControllerApi = new SodaApiControllerApi()

export const getAllFoodTruckPermits = async (size: number, page: number): Promise<PageImplFoodTruckPermit | undefined> => {
  try {
    const response = await sodaControllerApi.getAllFoodTruckPermits(size, page)
    return response.data as PageImplFoodTruckPermit
  } catch (e: any) {
    console.error(e)
  }
}

export const getFoodTruckPermitsByStatus = async (status: string[], size: number, page: number): Promise<PageImplFoodTruckPermit | undefined> => {
  try {
    const response = await sodaControllerApi.searchFoodTruckPermitByStatus(status, size, page)
    return response.data as PageImplFoodTruckPermit
  } catch (e: any) {
    console.error(e)
  }
}

export const searchFoodTruckPermits = async (input: string): Promise<PageImplFoodTruckPermit | undefined> => {
  try {
    const response = await sodaControllerApi.searchFoodTruckPermit(input)
    return response.data as PageImplFoodTruckPermit
  } catch (e: any) {
    console.error(e)
  }
}