document.addEventListener("DOMContentLoaded", function() {
  // Ensure Firebase is initialized
  if (!firebase.apps.length) {
    console.error("Firebase is not initialized!");
  } else {
    console.log("working");

    // Function to add a document to Firestore
    const user = {
      username: "TN",
      profile_name: "user.profile_name",
      password: "user.password",
      age : "user.age"
  }
  
  async function uploadInformation(user) {
      try {
        const docRef = await db.collection("users").add({
          username: user.username,
          profile_name: user.profile_name,
          password: user.password,
          age : user.age
        });
        console.log("elements inserted successfully ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    // Function to get data from Firestore
    async function getData() {
      try {
        const querySnapshot = await db.collection("users").get();
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
      } catch (e) {
        console.error("Error getting documents: ", e);
      }
    }

    // Call the functions
//    addDocument();
uploadInformation(user);
    getData();
  }
});
