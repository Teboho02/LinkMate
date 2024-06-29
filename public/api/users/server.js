// server.js
const express = require('express');
const app = express();
require('dotenv').config();

console.log("star");
// Your database import
const db = require('./firebase.js');

app.get('/api/users', (req, res) => {
  res.json({
    name: "starr",
    age: 10
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
