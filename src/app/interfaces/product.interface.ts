import { stoc } from "./stoc.interface";

export interface product{
    id: number,
    productName: string,
    productBrand: string,
    productDescription: string,
    productPrice: number,
    productImg: string, 
    stoc: stoc
}