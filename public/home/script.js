const image  = document.getElementById("image");



async function getData() {
    
    try {
        const querySnapshot = await db.collection("Profile").get();
        let isValidUser = false;
        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        }); 

    } catch (e) {
        console.error("Error getting data: ", e);
    }
}
