const express = require('express');
const app = express();

app.get('/api/users/login', (req, res) => {
  const a = {
    text: "HELLO WORLD",
    age: "20"
  };

  res.json(a);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
