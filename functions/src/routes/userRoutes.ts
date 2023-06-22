import express from "express";
import { getClient } from "../db";
import { User } from "../models/User";
import { ObjectId } from "mongodb";

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

userRouter.get('/users/:id', async(req, res) => {
  try {
    const _id = new ObjectId(req.params.id); 
    const client = await getClient();
    const result = await client.db()
          .collection<User>('users').findOne({ _id : _id }); 
    console.log(result);
    res.json(result);

  } catch (err) {
      console.error("ERROR", err);
      res.status(500).json({message: 'Internal Server Error'});
  }
});

userRouter.get('/users/email/:email', async(req, res) => {
  try {
    const emailid = req.params.email; 
    const client = await getClient();
    const result = await client.db()
          .collection<User>('users').findOne({ email : emailid }); 
    console.log(result);
    res.json(result);

  } catch (err) {
      console.error("ERROR", err);
      res.status(500).json({message: 'Internal Server Error'});
  }
});


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


userRouter.put('/users/:id',async (req, res) => {
  try {
      const id = new ObjectId(req.params.id);
      const data = req.body as User;
      delete data._id;
      const client = await getClient();
      const result = await client.db().collection<User>('users').replaceOne({_id: id}, data);
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

userRouter.delete("/users/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const client = await getClient();
    const result = await client.db().collection<User>('users').deleteOne({_id: id});
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
