import firebase from "https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js";
import config from "./config.js";


// Initialize Firebase
firebase.initializeApp(config);

// Export the Firestore database
const db = firebase.firestore();
export default db;
