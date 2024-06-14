document.addEventListener("DOMContentLoaded", function() {
    const chatMessages = document.getElementById("chatMessages");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");

    sendButton.addEventListener("click", function() {
        const messageText = messageInput.value.trim();

        if (messageText !== "") {

            const messageDiv = document.createElement("div");
            messageDiv.className = "info";
            messageDiv.textContent = messageText;

            chatMessages.appendChild(messageDiv);

            messageInput.value = "";

            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });
});


function sendMessage(){
    
}