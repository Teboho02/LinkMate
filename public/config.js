// Your Firebase configuration
//require('dotenv').config();



console.log(process.env.FIREBASE_PRIVATE_KEY);

const firebaseConfig = {
  apiKey: process.env.FIREBASE_PRIVATE_KEY,
  authDomain: "find-my-patner.firebaseapp.com",
  projectId: "find-my-patner",
  storageBucket: "find-my-patner.appspot.com",
  messagingSenderId: "892330665624",
  appId: "1:892330665624:web:1d597128bb74982e9a52ed"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
