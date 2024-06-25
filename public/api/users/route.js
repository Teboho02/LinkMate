import db from './firebase.js';

async function getData() {
  try {
    const querySnapshot = await db.collection("Message").get();
    const results = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      results.push(userData);
    });
    console.log(results);
    return results; // If you want to use this data elsewhere
  } catch (e) {
    console.error("Error getting data: ", e);
  }
}

getData();
