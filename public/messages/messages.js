document.addEventListener("DOMContentLoaded", function () {
  const chatMessages = document.getElementById("chatMessages");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  const chatwith = document.getElementById("chatwith");
  const prof = document.getElementById("prof");

  fetchCurrentTime();




  chatwith.textContent = localStorage.getItem("messaageFrom");

  getUserInfoById(localStorage.getItem("messaageFrom"));
  getMessagesAndDisplay();




  sendButton.addEventListener("click", function () {
    const messageText = messageInput.value.trim();

    if (messageText !== "") {
      const messageDiv = document.createElement("div");
      messageDiv.className = "info";
      messageDiv.textContent = messageText;

      chatMessages.appendChild(messageDiv);

      sendMessage(messageInput.value, localStorage.getItem("usermame"));
      messageInput.value = "";

      chatMessages.scrollTop = chatMessages.scroll;
    }
  });


  function getMessagesAndDisplay() {
    let messagesx = [];

    //update all to read



    async function getMessages() {
      try {

        const querySnapshot = await db.collection("Message").get();
        querySnapshot.forEach((doc) => {
          const userData = JSON.parse(JSON.stringify(doc.data()));

          if (
            userData.To == localStorage.getItem("username") &&
            userData.From == localStorage.getItem("messaageFrom")
          ) {
            messagesx.push(userData);
          }
          if (
            userData.From == localStorage.getItem("username") &&
            userData.To == localStorage.getItem("messaageFrom")
          ) {
            messagesx.push(userData);
          }
        });


        const len = messagesx.length;

        const acepMessage = messagesx[0];
        messagesx.splice(0, 1);



        messagesx.sort((a, b) => {
          let dateA = parseCustomTimeFormat(a.time[0]);
          let dateB = parseCustomTimeFormat(b.time[0]);
          return dateA - dateB; // Sort in descending order
        });



        const messageDiv = document.createElement("div");
        messageDiv.className = "info";
        messageDiv.textContent = "";
        messageDiv.style.color = "black";
        messageDiv.style.backgroundColor = "white";
        chatMessages.appendChild(messageDiv);
     



        for (let i = 0; i < len - 1; i++) {
          if (messagesx[i].message !== "chat request accepted") {
            console.log("print debbugin", messagesx[i].message);



            const messageDiv = document.createElement("div");
            messageDiv.className = "info";
            messageDiv.textContent = messagesx[i].message;
            messageDiv.style.color = "white";
            if (messagesx[i].From != localStorage.getItem("username")) {
              messageDiv.style.backgroundColor = "green";
            }
            chatMessages.appendChild(messageDiv);
            const time = document.createElement("div");
            time.className = "timeright";
            time.textContent = messagesx[i].time[0];
            messageDiv.appendChild(time);
    

          }
        }
      } catch (e) {
        console.error("Error getting data: ", e);
      }
    }

    getMessages();
  }
  async function fetchCurrentTime() {
    try {
      const response = await fetch(
        "https://worldtimeapi.org/api/timezone/Africa/Johannesburg"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const currentTime = new Date(data.datetime); // Use the 'datetime' field for local time

      const formattedTime = formatDateTime(currentTime);

      return formattedTime;
    } catch (error) {
      console.error("Error fetching time:", error);
    }
  }

  function formatDateTime(date) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-US", options).replace(",", "");
  }

  function sendMessage(myMessage, user) {
    let now = new Date();

    let time = fetchCurrentTime();

    async function uploadInformation(x) {
      try {
        let time = await fetchCurrentTime();
        console.log(time);

        const docRef = await db.collection("Message").add({
          From: localStorage.getItem("username"),
          To: localStorage.getItem("messaageFrom"),
          time: [time],
          message: myMessage,
          read : false
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
      const docRef = db
        .collection("userInfo")
        .doc(localStorage.getItem("messaageFrom"));
      const doc = await docRef.get();

      if (doc.exists) {
        const userData = doc.data();
        chatwith.textContent = JSON.parse(JSON.stringify(userData)).profile_name;
        if(JSON.parse(JSON.stringify(userData)).profile_picture.length > 10000){
          prof.src = JSON.parse(JSON.stringify(userData)).profile_picture;

        }
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



function parseCustomTimeFormat(timeString) {
  let parts = timeString.split(' ');
  let month = parts[0]; // Should be 'Jun'
  let day = parseInt(parts[1], 10); // Day of the month
  let year = parseInt(parts[2], 10); // Year
  let time = parts[3].split(':'); // Split time into hours, minutes, seconds
  let hour = parseInt(time[0], 10); // Hours
  let minute = parseInt(time[1], 10); // Minutes
  let second = parseInt(time[2], 10); // Seconds


  return new Date(year, getMonthIndex(month), day, hour, minute, second);
}

function getMonthIndex(month) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.indexOf(month);
}


