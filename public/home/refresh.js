
const reqMenu = document.getElementById("chatReq");
const myUsername = localStorage.getItem("username");
const mes = document.getElementById("mess");

checkRequests();
checkMessages();
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
        let froms = [];
        const querySnapshot = await res.get();
        querySnapshot.forEach((doc) => {
            let res = doc.data();
            if (froms.includes(res.From)) {
            } else {
                froms.push(res.From);
            }
        });
        

        unreadCount = froms.length;

        alert(unreadCount);

        if (unreadCount > 0) {  
            console.log(`You have ${unreadCount} unread messages.`);
            var chatReqElement = document.getElementById('mess').querySelector('a');
            var icon = chatReqElement.querySelector('i');
            chatReqElement.textContent = 'Messages(' + unreadCount + ')';
            chatReqElement.prepend(icon); 
        }
    } catch (error) {
        console.error("Error checking messages:", error);
    }
}