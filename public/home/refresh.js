

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


    if(count > 0){
        var chatReqElement = document.getElementById('chatReq').querySelector('a');
        var icon = chatReqElement.querySelector('i');
        chatReqElement.textContent = ' Chat Requests(' + count + ')';
        chatReqElement.prepend(icon); 
    }

    //change inner html of chat request



}

function checkMessages() {
    //diplay the number of people
}