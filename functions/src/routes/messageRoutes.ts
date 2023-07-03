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

messageRouter.get('/messages/user/:user', async(req, res) => {
  try {
    const user = new ObjectId(req.params.user);
    const client = await getClient();
    const result = await client.db()
          .collection<Message>('messages').find( { $or: [ { 'senderId': user },
                                                          { 'receiverId': user }
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
    let message = req.body as Message;
    message.initiator = new ObjectId(message.initiator);
    message.receiverId = new ObjectId(message.receiverId);
    message.senderId = new ObjectId(message.senderId);
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
      let data = req.body as Message;
      data.initiator = new ObjectId(data.initiator);
      data.receiverId = new ObjectId(data.receiverId);
      data.senderId = new ObjectId(data.senderId);
      delete data._id;
      const client = await getClient();
      const result = await client.db().collection<Message>('messages').replaceOne({_id: id}, data);
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

  messageRouter.delete("/messages/:id", async (req, res) => {
    try {
      const id = new ObjectId(req.params.id);
      const client = await getClient();
      const result = await client.db().collection<Message>('messages').deleteOne({_id: id});
      if (result.deletedCount === 0) {
        res.status(404).json({message: "Not Found"});
      } 
      else {
         res.json(result);
      }
    } catch (err) {
      console.error("FAIL", err);
      res.status(500).json({ message: "internal Server Error"});
    }
  })