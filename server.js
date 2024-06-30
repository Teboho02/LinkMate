const express = require('express');
const path = require('path');
const dotenv = require('dotenv');


const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.googleAPI);

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "Write a story about a magic backpack."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();

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





