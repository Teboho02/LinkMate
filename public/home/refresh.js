

//check for new chat request. If available, update the DO, show 1

const myUsername = localStorage.getItem("username");

checkRequests();
async function checkRequests() {

    let count = 0;

    console.log("running");
    const res = await db.collection("chatInvite");

    const querySnapshot = await res.get();
    querySnapshot.forEach((doc) => {
        const userdata = doc.data();
        console.log(userdata.to);
        console.log(userdata.from);

        if(!userdata.Accepted && userdata.to === myUsername){
            count++;
        }


    });

    alert("count ",count);


}

function checkMessages() {
    //diplay the number of people
}