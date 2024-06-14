document.addEventListener("DOMContentLoaded", function() {
    const chatMessages = document.getElementById("chatMessages");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");
    const chatwith = document.getElementById("chatwith");
    const prof = document.getElementById("prof");


    console.log(localStorage.getItem("messaageFrom"));

    chatwith.textContent =localStorage.getItem("messaageFrom");



    getUserInfoById(localStorage.getItem("messaageFrom"));


    sendButton.addEventListener("click", function() {
        const messageText = messageInput.value.trim();

        if (messageText !== "") {

            const messageDiv = document.createElement("div");
            messageDiv.className = "info";
            messageDiv.textContent = messageText;


            chatMessages.appendChild(messageDiv);

            sendMessage(messageInput.value, localStorage.getItem("usermame"));
            messageInput.value = "";

            chatMessages.scrollTop = chatMessages.scroll
        }
    });

    function getMessagesAndDisplay(){

        let messagesx = [];
        console.log("running");
        async function getMessages() {
            try {
                console.log("running 2");

                const querySnapshot = await db.collection("Message").get();
                querySnapshot.forEach((doc) => {
                    const userData = JSON.parse(JSON.stringify(doc.data()));
                
                //    messaageFrom
                    if(userData.To == localStorage.getItem("username") && userData.From == localStorage.getItem("messaageFrom")){
                        messagesx.push(userData);
                        
                    }
                    if(userData.From == localStorage.getItem("username") && userData.To == localStorage.getItem("messaageFrom")){
                        messagesx.push(userData);

                    }

                }); 

                console.log(messagesx);


                const len = messagesx.length;

                for(let i = 0; i < len; i++){
                    //change color to blue
                    const messageDiv = document.createElement("div");
                    messageDiv.className = "info";
                    messageDiv.textContent = messagesx[i].message;
                    messageDiv.style.color = "white";
                    if(messagesx[i].From != localStorage.getItem("username")){
                        messageDiv.style.backgroundColor = "green";
                    }   
                    chatMessages.appendChild(messageDiv);

                }

        
            } catch (e) {
                console.error("Error getting data: ", e);
            }
        }

        getMessages();


        

    }


    function sendMessage(myMessage, user){
        let now = new Date();

        let time = [now.getFullYear(), now.getMonth() + 1,now.getDay(), now.getHours(),now.getMinutes(), now.getSeconds()];
  
        async function uploadInformation(x) {
            try {
                const docRef = await db.collection("Message").add({
            
                    From : localStorage.getItem("username"),
                    To : localStorage.getItem("messaageFrom"),
                    time : time,
                    message : myMessage


                });
                console.log("message sent ");
            } catch (e) {
                console.error("Error sending message: ", e);
            }
        }


        uploadInformation(myMessage);
        
    }



        async function getUserInfoById(docId) {
            try {
                const docRef = db.collection("userInfo").doc("q");
                const doc = await docRef.get();
                
                if (doc.exists) {
                    const userData = doc.data();
                    console.log("what is this");
                //    console.log(`${doc.id} => ${JSON.stringify(userData)}`);
                prof.src = JSON.parse(JSON.stringify(userData)).profile_picture;
                } else {
                    console.log("No such document!");
                }   
            } catch (e) {
                console.error("Error getting document: ", e);
            }
        }
        
        // Example usage:
        getUserInfoById(localStorage.getItem("messaageFrom"));
        


    
});


async function getMessages() {
    try {
        const querySnapshot = await db.collection("Messages").get();
        let isValidUser = false;
        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        }); 

    } catch (e) {
        console.error("Error getting data: ", e);
    }
}


