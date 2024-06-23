

// Your Firebase configuration
const admin = require('firebase-admin');
require('dotenv').config();

// api/login.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      // Process login
      const { username, password } = req.body;
  
      // Mock authentication logic
      if (username === 'user' && password === 'password') {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
    });
}

const db = admin.firestore();

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;

    try {
        const querySnapshot = await db.collection('users').get();
        let isValidUser = false;

        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            if (userData.username === username && userData.password === password) {
                isValidUser = true;
            }
        });

        return res.status(200).json({ isValidUser });
    } catch (e) {
        console.error('Error getting data: ', e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

