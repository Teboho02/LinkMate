console.log("runs");

const username = document.getElementById("username");
const profile_name = document.getElementById("profile_name");
const password = document.getElementById("password");
const age = document.getElementById("age");
const gender = document.getElementById("gender");
const createAcc = document.getElementById("createACC");

async function uploadInformation(user) {
    try {
        const docRef = await db.collection("users").doc(user.username).set({
            username: user.username,
            profile_name: user.profile_name,
            password: user.password,
            age: user.age,
            gender: user.gender
        });
        console.log("elements inserted successfully ", docRef.id);
        alert("account created successfully");
        window.location.href = "../index.html";
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
        password: password.value,
        age: age.value,
        gender: gender.value
    };

    uploadInformation(user);
});
