// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFBwd8yFSrkKvZikexNWb8VMRozAe1mEk",
    authDomain: "find-my-patner.firebaseapp.com",
    projectId: "find-my-patner",
    storageBucket: "find-my-patner.appspot.com",
    messagingSenderId: "892330665624",
    appId: "1:892330665624:web:1d597128bb74982e9a52ed"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  