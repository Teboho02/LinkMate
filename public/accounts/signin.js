const username = document.getElementById("username");
const password = document.getElementById("password");
const si = document.getElementById("sii");

if(localStorage.getItem("username") != null){
   //TODOs uncomment later
    window.location.href = "./profile/profile.html"
}


async function getData(username, password) {


    async function loginUser(username, password) {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const result = await response.json();
            console.log(result);
            return result.isValidUser;
        } catch (error) {
            console.error('Error logging in:', error);
            return false;
        }
    }
    
    // Example usage
    loginUser('exampleUsername', 'examplePassword')
        .then(isValidUser => {
            if (isValidUser) {
                console.log('Login successful');
            } else {
                console.log('Invalid credentials');
            }
        });
    

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
