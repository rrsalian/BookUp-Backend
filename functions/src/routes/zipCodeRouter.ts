import express from "express";
import { zipList } from "../models/USZip";

//const fs = require('fs');
const zipCodeRouter = express.Router();

zipCodeRouter.get("/us-zips", async (req, res) => {

//const zips = () => fs.readFileSync('/models/usZips.json','utf8')
//res.status(200).json(zips)

//const zips = () => fs.readFileSync(require.resolve("../models/usZips.json"), { encoding: "utf8" });
    res.json(zipList);
})

export default zipCodeRouter