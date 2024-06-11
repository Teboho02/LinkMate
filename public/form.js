
document.addEventListener("DOMContentLoaded", function() {
    // Ensure Firebase is initialized
    if (!firebase.apps.length) {
      console.error("Firebase is not initialized!");
    } else {
      console.log("working");
  
      // Function to add a document to Firestore
      async function addDocument() {
        try {
          const docRef = await db.collection("users").add({
            first: "Ada",
            last: "Lovelace",
            born: 1815
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }


 async function getData(){
    
    const querySnapshot = await db.collection(db, "users");
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

 }


  
      // Call the function to add the document
      addDocument();
      getData();
    }
  });
  