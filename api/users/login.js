

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
  

  async function getData(username, password) {
    console.log(encryptData(password, "stillLovekamo"));
    try {
        const querySnapshot = await db.collection("users").get();
        let isValidUser = false;

        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            if (userData.username === username && userData.password === password) {
                isValidUser = true;

                return isValidUser;
            }
        });

        return isValidUser;
    } catch (e) {
        console.error("Error getting data: ", e);
        return false;
    }
}

res = await getData("Test2", "Test2");

if(res){
    console.log("cys");
    console.log("tru");
}