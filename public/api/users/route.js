const firebaseapp = require("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
const firestore = require("https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js");
const config = require("./config.js");

getData();

async function getData() {

  try {
    const querySnapshot = await db.collection("Message").get();
    querySnapshot.forEach((doc) => {
      const userData = doc.data();

      let res = JSON.stringify(doc.data());
      let jsonRes = JSON.parse(res);
   
      return res;

    });
  } catch (e) {
    console.error("Error getting data: ", e);
  }

}
