

//check for new chat request. If available, update the DO, show 1
const reqMenu = document.getElementById("chatReq");
const myUsername = localStorage.getItem("username");

checkRequests();
async function checkRequests() {

    let count = 0;

    console.log("running");
    const res = await db.collection("chatInvite");

    const querySnapshot = await res.get();
    querySnapshot.forEach((doc) => {
        const userdata = doc.data();

        if(!userdata.Accepted && userdata.to === myUsername){
            count++;
        }


    });

    var chatReqElement = document.getElementById('chatReq').querySelector('a');
    var icon = chatReqElement.querySelector('i');
    chatReqElement.textContent = ' Chat Requests(1)'; // Set the text content first
    chatReqElement.prepend(icon); // Prepend the icon back to maintain the structure
    

    //change inner html of chat request



}

function checkMessages() {
    //diplay the number of people
}