import express from "express";
import { getClient } from "../db";
import { Message } from "../models/Message";
import { ObjectId } from "mongodb";

export const messageRouter = express.Router();

messageRouter.get('/messages/:id', async(req, res) => {
  try {
    const _id = new ObjectId(req.params.id); 
    const client = await getClient();
    const result = await client.db()
          .collection<Message>('messages').findOne({ _id : _id }); 
    console.log(result);
    res.json(result);

  } catch (err) {
      console.error("ERROR", err);
      res.status(500).json({message: 'Internal Server Error'});
  }
});

messageRouter.get('/messages/:bookId/:user1/:user2', async(req, res) => {
  try {
    const bookId = req.params.bookId;
    const user1 = new ObjectId(req.params.user1);
    const user2 = new ObjectId(req.params.user2);
    const client = await getClient();
    const result = await client.db()
          .collection<Message>('messages').find( { $or: [
                                                            { 'isbn' : bookId , 'senderId': user1, 'receiverId': user2 },
                                                            { 'isbn' : bookId , 'senderId': user2, 'receiverId': user1 }
                                                           ]
                                                    }
                                                    ).toArray();
    console.log(result);
    res.json(result);
  } catch (err) {
      console.error("ERROR", err);
      res.status(500).json({message: 'Internal Server Error'});
  }
});

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

messageRouter.put('/messages/:id',async (req, res) => {
  try {
      const id = new ObjectId(req.params.id);
      const data = req.body as Message;
      delete data._id;
      const client = await getClient();
      const result = await client.db().collection<Message>('users').replaceOne({_id: id}, data);
      if (result.modifiedCount === 0) {
        res.status(404).json({message: "Not Found"});
      } 
      else {
         data._id = new ObjectId(id);
         res.json(result);
      }
    } catch (err) {
      console.error("FAIL", err);
      res.status(500).json({ message: "internal Server Error"});
    }
  });