import { product } from "./product.interface"

export interface cartProduct {
    id: number,
    product: product[],
    personID: number,
    amount: number
}