const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/getEnv', (req, res) => {
  res.json({ apiUrl: process.env.FIREBASE_PRIVATE_KEY });
});


  

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// function encryptData(plainText, secretKey) {
//   const encryptedData = CryptoJS.AES.encrypt(plainText, secretKey).toString();
//   return encryptedData;
// }

// function decryptData(encryptedData, secretKey) {
//   const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//   const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
//   return decryptedText;
// }





