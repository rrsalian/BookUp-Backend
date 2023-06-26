import { ObjectId } from "mongodb";

export interface Message {
    _id?: ObjectId,
    createdAt: Date,
    initiator: ObjectId,
    isbn: string,
    receiverId: ObjectId,
    senderId: ObjectId,       
    swapToIsbn: string,
    state: string,
    messages: string[]
}