const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API's
app.get('/', (req, res) => {
    res.send('FurniCorner Server is running!');
});

app.listen(port, () => {
    console.log('Listening to port', port);
});
