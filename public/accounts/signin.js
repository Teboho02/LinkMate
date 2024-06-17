const username = document.getElementById("username");
const password = document.getElementById("password");
const si = document.getElementById("sii");

if(localStorage.getItem("username") != null){
   //TODOs uncomment later
 //   window.location.href = "./profile/profile.html"
}


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

si.addEventListener("click", async () => {
    if (!firebase.apps.length) {
        console.error("Firebase is not initialized!");
    } else {
        console.log("working");
    }

    const result = await getData(username.value, password.value);

    if (result) {
        localStorage.setItem("username",username.value);
        window.location.href = "./profile/profile.html";

    } else {
        alert("Invalid username or password");
    }
});

function encryptData(plainText, secretKey) {
    const encryptedData = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    return encryptedData;
}
