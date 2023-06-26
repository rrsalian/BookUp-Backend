import express from "express";
import { getClient } from "../db";
import { Message } from "firebase-functions/v1/pubsub";
import { ObjectId } from "mongodb";

export const messageRouter = express.Router();

messageRouter.get('/messages', async(req,res) => {
    try {
      const client = await getClient();
      const results = await client.db()
            .collection<Message>('messages').find().toArray();
      console.log(results);
      res.json(results);

    } catch (err) {
        console.error("ERROR", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}
)

messageRouter.post('/messages', async(req, res) => {
  try {  
    const message = req.body as Message;
    const client = await getClient();
    await client.db()
      .collection<Message>('messages')
      .insertOne(message);
    res.status(201).json(message);
  } catch (err) {
      console.error("ERROR", err);
      res.status(500).json({message: 'Internal Server Error'});
  }
});


messageRouter.get('/messages/:bookId', async(req, res) => {
  try {
    const bookId = new ObjectId(req.params.bookId);
    //const user1 = new Object(req.params.user1);
    //const user2 = new Object(req.params.user2);
    const client = await getClient();
    const result = await client.db()
          .collection<Message>('messages').findOne({ isbn : bookId});
    console.log(result);
    res.json(result);

  } catch (err) {
      console.error("ERROR", err);
      res.status(500).json({message: 'Internal Server Error'});
  }
});