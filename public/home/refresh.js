

//check for new chat request. If available, update the DO, show 1

const myUsername = localStorage.getItem("username");

const res = await db.collection("chatInvite").where("to", "=", myUsername);

const querySnapshot = await res.get();
querySnapshot.forEach((doc) => {

    console.log(doc.data);

});