const username = document.getElementById("username");
const profile_name = document.getElementById("profile_name");
const password = document.getElementById("password");
const age = document.getElementById("age");
const gender = document.getElementById("gender");
const createAcc = document.getElementById("createACC");

async function uploadInformation(user) {
    var encrypted = CryptoJS.AES.encrypt(user.password, "star").toString();


    try {

        const usernameSnapshot = await db.collection("users").doc(user.username).get();
        if (usernameSnapshot.exists) {
          console.log("Username already exists");
          return;
        }

        async function addUser(user) {
            try {
              const response = await fetch('/api/addUser', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
              });
          
              const result = await response.json();
              if (response.ok) {
                console.log(result.message);
              } else {
                console.error('Error:', result.error);
              }
            } catch (error) {
              console.error('Error:', error);
            }
          }

          const user = {
            username: 'johndoe',
            profile_name: 'John Doe',
            password: 'password123',
            age: 25,
            gender: 'Male'
          };
          
          // Call the function to add a new user
          addUser(user);



     

        alert("account created successfully");
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    try {
        const docRef = await db.collection("userInfo").doc(user.username).set({
            profile_name: user.profile_name,
            picture : ""
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

createAcc.addEventListener("click", function() {
    if (!firebase.apps.length) {
        console.error("Firebase is not initialized!");
    } else {
        console.log("working");
    }


    const user = {
        username: username.value,
        profile_name: profile_name.value,
        password: encryptData(password.value),
        age: age.value,
        gender: gender.value
    };

    uploadInformation(user);
});

  function encryptData(plainText) {
    const encryptedData = CryptoJS.AES.encrypt(plainText, "stillLovekamo").toString();
    return plainText;

}
