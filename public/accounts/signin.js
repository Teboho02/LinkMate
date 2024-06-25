const username = document.getElementById("username");
const password = document.getElementById("password");
const si = document.getElementById("sii");
import config from "./api/users/config.js";

if(localStorage.getItem("username") != null){
   //TODOs uncomment later
   // window.location.href = "./profile/profile.html"
}

async function getData(username, password) {


  fetch('/api/users/config')
  .then(response => response.json())
  .then(data => {
    console.log('Secret Key:', data.secretKey);
  });


  try {
      const querySnapshot = await db.collection("users").get();
      let isValidUser = false;

      querySnapshot.forEach((doc) => {
          const userData = doc.data();

          if (userData.username === username && userData.password === password) {
              isValidUser = true;
          }
          console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });

      return isValidUser;
  } catch (e) {
      console.error("Error getting data: ", e);
      return false;
  }
}

  
  
si.addEventListener("click", async () => {

    const result = await getData(username.value, password.value);

    if (result) {
        localStorage.setItem("username",username.value);
        window.location.href = "./profile/profile.html";

    } else {
        //alert("Invalid username or password");
    }
});

function encryptData(plainText, secretKey) {
    const encryptedData = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    return encryptedData;
}
