const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.googleAPI);

async function generateStory() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Write a story about a magic backpack.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error generating story:", error);
    return "Error generating story.";
  }
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/getEnv', (req, res) => {
  res.json({ apiUrl: process.env.FIREBASE_PRIVATE_KEY });
});

app.get('/gemini', async (req, res) => {
  const story = await generateStory();
  res.json({ story });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
