
const db = {
    collection: (name) => ({
        get: async () => ({
            forEach: (callback) => {
                const mockData = [
                    { id: '1', data: () => ({ username: 'testUser', password: 'testPass' }) },
                    { id: '2', data: () => ({ username: 'anotherUser', password: 'anotherPass' }) },
                ];
                mockData.forEach(doc => callback(doc));
            }
        })
    })
};

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
        localStorage.setItem("username", username.value);
        window.location.href = "./public/profile/profile.html";
    } else {
        alert("Invalid username or password");
    }
});

// Test function
async function test() {
    // Set up mock values
    username.value = "testUser";
    password.value = "testPass";

    // Simulate button click
    await si.click();

    // Check result
    const storedUsername = localStorage.getItem("username");
    if (storedUsername === "testUser") {
        console.log("Test passed: Valid user");
    } else {
        console.log("Test failed: Valid user");
    }

    // Test invalid user
    username.value = "invalidUser";
    password.value = "invalidPass";
    await si.click();

    if (!localStorage.getItem("username")) {
        console.log("Test passed: Invalid user");
    } else {
        console.log("Test failed: Invalid user");
    }
}

// Run the test
test();