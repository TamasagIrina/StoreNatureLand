import { product } from "./product.interface";

export interface cart{
    id: number,
    amount:number,
    personid: number,
    product: {
            id:  number,
            productName: string,
            productBrand: string,
            productDescription: string,
            productPrice: number,
            productImg: string
            }
}