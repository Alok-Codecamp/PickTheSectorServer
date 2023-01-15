const express = require('express');
const {MongoClient, Db, ServerApiVersion} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mrwnd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        console.log("database connected successfully");

        const database = client.db("PicTheSector");
        const sectorCollection = database.collection("sector");
       const userCollection = database.collection("user");
      
       app.get('/sector',async(req,res)=>{
        const cursor = sectorCollection.find({});
        const sectors = await cursor.toArray();
        res.send(sectors)
       })

       app.post('/user',async( req,res)=>{
        const userData=req.body;
        const result=await userCollection.insertOne(userData);
        console.log("added successful",result.insertedId)  
        res.json(result);
       });

       app.get('/user',async(req,res)=>{
        const cursor = userCollection.find({});
        const users = await cursor.toArray();
        res.send(users)
       })
      

    }
    finally{
        // await client.close()
    }
   
}
run().catch(console.dir);
app.get('/',(req,res)=>{
    res.send('hello world!')
})

app.listen(port,()=>{
    console.log(`example app listesing at port: ${port}`)
})