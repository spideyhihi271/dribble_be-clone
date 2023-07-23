const express = require('express');
const app = express();

// Dependency
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParse = require('cookie-parser');
const db = require('./src/config/db');
const route = require('./src/routes');
const port = 3000;

// Config
app.use(cors());
app.use(cookieParse());
app.use(express.json());
dotenv.config();
// Set up 
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

// ConnectDB
db.connectDB();

// Routers
route(app);

app.listen(port, () => {
    console.log('Server was running at port 3000');
})
