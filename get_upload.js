
//getting
async function getData() {
    try {
        const querySnapshot = await db.collection("users").get();
        let isValidUser = false;
        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        }); 

    } catch (e) {
        console.error("Error getting data: ", e);
    }
}

//insertingg
async function uploadInformation(user) {
    try {
        const docRef = await db.collection("users").add({
            username: user.username,
            profile_name: user.profile_name,
            password: user.password,
            age: user.age,
            gender: user.gender
        });
        console.log("elements inserted successfully ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


async function update(){

    try {
        const docRef = await db.collection("users").doc("UaA60UiALYQYNfwgH2un").update({
            username: "xyt",
            profile_name: "xyt",
            password: "xyt",
            age: "xyt",
            gender: "xyt"
        });
        console.log("elements inserted successfully ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}