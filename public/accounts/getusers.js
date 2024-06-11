

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