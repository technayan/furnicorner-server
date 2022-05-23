const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default API
app.get('/', (req, res) => {
    res.send('FurniCorner Server is running!');
});

// Connect to MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6ycnj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);
async function run() {
    try {
        await client.connect();
        const productCollection = client.db('furniCorner').collection('products');
        
        // APIs
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });
    }
    finally {

    }
}

run();



app.listen(port, () => {
    console.log('Listening to port', port);
});
