import { OrderStatus } from "./orderStatus.interfac";

export interface oreder {
    id: number,
    clientId: number,
    first_name: string,
    last_name: string,
    address: string,
    phone_number: string,
    cart_elements: string,
    payment_method: string,
    status: OrderStatus
}