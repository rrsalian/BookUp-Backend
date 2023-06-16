import express from "express";
import { getClient } from "../db";
import { User } from "../models/User";

export const userRouter = express.Router();

userRouter.get('/users', async(req,res) => {
    try {
      const client = await getClient();
      const results = await client.db()
            .collection<User>('users').find().toArray(); 

      console.log(results);
      res.json(results);

    } catch (err) {
        console.error("ERROR", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}
)

userRouter.post('/users', async(req, res) => {
    try {  
      const user = req.body as User;
      const client = await getClient();
      await client.db()
        .collection<User>('users')
        .insertOne(user);
      res.status(201).json(user);
    } catch (err) {
        console.error("ERROR", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
  });