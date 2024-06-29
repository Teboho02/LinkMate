

//check for new chat request. If available, update the DO, show 1

const myUsername = localStorage.getItem("username");

checkRequests();
async function checkRequests() {

    const res = await db.collection("chatInvite").where("to", "=", myUsername);

    const querySnapshot = await res.get();
    querySnapshot.forEach((doc) => {

        console.log(doc.data);

    });


}

function checkMessages() {
    //diplay the number of people
}