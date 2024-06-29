

//check for new chat request. If available, update the DO, show 1

const myUsername = localStorage.getItem("username");

checkRequests();
async function checkRequests() {

    console.log("running");
    const res = await db.collection("chatInvite");

    const querySnapshot = await res.get();
    querySnapshot.forEach((doc) => {

        const userdata = doc.data();
        console.log(userdata.to);
        console.log(userdata.from);


    });


}

function checkMessages() {
    //diplay the number of people
}