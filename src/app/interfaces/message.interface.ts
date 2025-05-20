import { messageStatus } from "./messageStatus.interface";
export interface message {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    message: string,
    messageStatus: messageStatus

}