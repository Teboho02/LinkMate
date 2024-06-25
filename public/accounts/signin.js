const username = document.getElementById("username");
const password = document.getElementById("password");
const si = document.getElementById("sii");

if(localStorage.getItem("username") != null){
   //TODOs uncomment later
    window.location.href = "./profile/profile.html"
}

async function getData(username, password) {
    async function logMovies() {
      try {
        const response = await fetch("/api/users/login.js"); // Adjust this path if needed
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const movies = await response.json();
        console.log(movies);
      } catch (e) {
        console.error("Error fetching movies:", e);
      }
    }
  
    logMovies();
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
