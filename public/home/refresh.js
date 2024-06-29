

const reqMenu = document.getElementById("chatReq");
const myUsername = localStorage.getItem("username");

checkRequests();
async function checkRequests() {

    let count = 0;
    const res = await db.collection("chatInvite").where("to", "==", myUsername).where("Accepted" , "==" , false);

    const querySnapshot = await res.get();
    querySnapshot.forEach((doc) => {
            count++;    
    });
    if(count > 0){
        var chatReqElement = document.getElementById('chatReq').querySelector('a');
        var icon = chatReqElement.querySelector('i');
        chatReqElement.textContent = ' Chat Requests(' + count + ')';
        chatReqElement.prepend(icon); 
    }
}

async function checkMessages() {
    try {
        let unreadCount = 0;
        const res = await db.collection("Message").where("To", "==", myUsername);

        const querySnapshot = await res.get();
        querySnapshot.forEach((doc) => {
            unreadCount++;
        });

        alert("unread ",unreadCount);
        if (unreadCount > 0) {
            console.log(`You have ${unreadCount} unread messages.`);
        }
    } catch (error) {
        console.error("Error checking messages:", error);
    }
}