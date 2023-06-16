/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//import {onRequest} from "firebase-functions/v2/https";
//import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


import * as functions from "firebase-functions";
// require the express module
import express from "express";

// require the cors module
import cors from "cors";
import zipCodeRouter from "./routes/zipCodeRouter"
import { userRouter } from "./routes/userRoutes";

// creates an instance of an Express server
const app = express();

// enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains
app.use(cors());

// allow POST and PUT requests to use JSON bodies
app.use(express.json());

app.use("/", zipCodeRouter);
app.use("/", userRouter);

// define the port
//const port = 5001;

export const api = functions.https.onRequest(app);

// run the server
//app.listen(port, () => console.log(`Listening on port: ${port}.`));