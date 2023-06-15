import { USZip } from "./USZip";
import { ObjectId } from "mongodb";
import { Book } from "./Book";

export interface User {
    _id?: ObjectId,
    uid: string,
    email: string,
    zipcode: USZip,
    books: Book[]
}
