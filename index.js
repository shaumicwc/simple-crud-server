const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// setting middleware

app.use(cors());
app.use(express.json())


// csreborn24
// mxlkubOA4ddTToYz






const uri = "mongodb+srv://csreborn24:mxlkubOA4ddTToYz@cluster0.ggbivlt.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        
        await client.connect();
    
        const userCollection = client.db('usersDB').collection('users');
    
        app.get('/users', async( req, res) => {
            const cursor = userCollection.find()
            const result = await cursor.toArray();
            res.send(result);
        })
    
        app.get('/users/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const user = await userCollection.findOne(query);
            res.send(user);
        })
    
        app.post('/users', async(req, res) => {
            const user = req.body;
            console.log('new user', user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        });
    
        app.put('/users/:id', async(req, res) =>{
            const id = req.params.id;
            const user = req.body;
            console.log(id, user);
            
            const filter = {_id: new ObjectId(id)}
            const options = {upsert: true}
            const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.email
                }
            }
    
            const result = await userCollection.updateOne(filter, updatedUser, options );
            res.send(result);
    
        })
    
        app.delete('/users/:id', async(req, res) =>{
            const id = req.params.id;
            console.log('please delete from database', id);
            const query = { _id: new ObjectId(id)}
            
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
    
    
      
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      }finally {
        
      }
    }
    run().catch(console.dir);
    
    
    
    app.get('/', (req, res) =>{
        res.send('SIMPLE CRUD IS RUNNING')
    })
    
    app.listen(port, () =>{
        console.log(`SIMPLE CRUD is running on port, ${port}`)
    })