const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
// const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 8000;

// app.use(bodyParser.urlencoded({ extended: true }))

require('./routes')(app, {});
app.listen(port, () => { console.log('we are live on ' + port); });