import * as functions from 'firebase-functions';

import { MongoClient } from "mongodb";
//import dotenv from "dotenv";  // this will not be using with firebase instead we use another config file
//dotenv.config();

// when using local but changes when using firebase
//const uri = process.env.MONGO_URI || "";
const uri: string = functions.config().mongodb.uri;

const client:MongoClient = new MongoClient(uri);

export const getClient = async () => {
    await client.connect();
    return client;
}