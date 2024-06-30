const username = document.getElementById("username");
const password = document.getElementById("password");
const si = document.getElementById("sii");

if(localStorage.getItem("username") != null){
   //TODOs uncomment later
   // window.location.href = "./profile/profile.html"
}




async function getData(username, password) {

    const userDocRef = db.collection("users").doc(username);

    const userDocSnap = await userDocRef.get();

        return userDocSnap.data().password == password ? true : false;
      
}

si.addEventListener("click", async () => {

    const result = await getData(username.value, password.value);

    if (result) {
        localStorage.setItem("username",username.value);
        window.location.href = "./profile/profile.html";

    } else {
        alert("Invalid username or password");
    }
});

