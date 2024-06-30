const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { Firestore } = require('@google-cloud/firestore'); // Make sure to install @google-cloud/firestore

dotenv.config();
const db = new Firestore();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/getEnv', (req, res) => {
  res.json({ apiUrl: process.env.FIREBASE_PRIVATE_KEY });
});



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/addUser', async (req, res) => {
    const { username, profile_name, password, age, gender } = req.body;
    if (!username || !profile_name || !password || !age || !gender) {
      return res.status(400).json({ error: 'Missing user information' });
    }
  
    try {
      const encryptedPassword = encryptData(password, process.env.SECRET_KEY);
      await db.collection('users').doc(username).set({
        username,
        profile_name,
        password: encryptedPassword,
        age,
        gender
      });
      res.status(200).json({ message: 'User added successfully' });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: 'Failed to add user' });
    }
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


