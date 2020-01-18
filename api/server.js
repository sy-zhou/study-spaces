const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
require('./routes')(app, {});

// static file declaration
app.use(express.static(path.join(__dirname, '../frontend/build')));

if (process.env.NODE_ENV === 'production') {
  // production mode
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
} else {
  // build mode
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/public', 'index.html'));
  });
}

// start server
app.listen(port);