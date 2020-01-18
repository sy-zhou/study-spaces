const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
require('./routes')(app, {});

// if (process.env.NODE_ENV === 'production') {
  // production mode
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
// } else {
//   // build mode
//   app.use(express.static(path.join(__dirname, './frontend/build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './frontend/public', 'index.html'));
//   });
// }

// start server
app.listen(port);