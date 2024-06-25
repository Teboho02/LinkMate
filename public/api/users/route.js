import db from './firebase.js';

const express = require('express');
const app = express();
require('dotenv').config();

app.get('/api/config', (req, res) => {
  res.json({name : "starr",
    age : 10
   });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
