const username = document.getElementById("username");
const password = document.getElementById("password");
const si = document.getElementById("sii");

async function getData(username, password) {
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
    if (!firebase.apps.length) {
        console.error("Firebase is not initialized!");
    } else {
        console.log("working");
    }

    const result = await getData(username.value, password.value);

    if (result) {
        window.location.href = "./public/home/home.html";

    } else {
        alert("Invalid username or password");
    }
});
