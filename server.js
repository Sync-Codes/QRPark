const express = require('express');
const cors = require("cors");
const app = express();
const dotenv = require('dotenv').config();
// dotenv.config();

// Connect to database
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.id}:${process.env.pass}@cluster0.4vjhf8h.mongodb.net/test`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(cors());
app.use(express.json());


// Define Routes
app.use('/:vehnum', async (req, res) => {
    const vehnum = req.params.vehnum;
    const db = client.db('orion');
    const users = db.collection('users');
    
    const query = { vehnum: vehnum };
    const user = await users.findOne(query);
    console.log(user);
    res.send('Hello World from express');
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));