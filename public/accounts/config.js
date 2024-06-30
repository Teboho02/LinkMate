
async function fetchEnv() {
  const response = await fetch('/api/getEnv');
  const data = await response.json();
  console.log(data);

  return data.apiUrl

}

const key = fetchEnv();

const firebaseConfig = {
  apiKey: key,
  authDomain: "find-my-patner.firebaseapp.com",
  projectId: "find-my-patner",
  storageBucket: "find-my-patner.appspot.com",
  messagingSenderId: "892330665624",
  appId: "1:892330665624:web:1d597128bb74982e9a52ed"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
