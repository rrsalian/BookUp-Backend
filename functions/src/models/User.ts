import { USZip } from "./USZip";
import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId,
    username: string,
    zipcode: USZip,
    books: string[]
}
