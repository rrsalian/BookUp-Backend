import { USZip } from "./USZip";
import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId,
    uid: string,
    email: string,
    zipcode: USZip,
    books: string[],
    //havebooks: string[],
    //wantbooks: string[],
}
