async function getData() {
  try {
    const myUsername = localStorage.getItem("username");
    let req = [];
    let ids = [];
    const querySnapshot = await db.collection("chatInvite").get();

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.to === myUsername && !userData.Accepted) {
        req.push(userData);
        ids.push(doc.id);
      }
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });

    if (req.length > 0) {
      const cardContainer = document.querySelector(".card__content");

      req.forEach(async (userData, index) => {
        const senderPicture = await getPicture(userData.from);

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = senderPicture; // Set the profile picture URL
        img.style.width = "45px";
        img.style.height = "45px";

        const label = document.createElement("label");
        label.textContent = `${userData.from} has requested to chat with you`;

        const buttonAccept = document.createElement("button");
        buttonAccept.textContent = "Accept";

        buttonAccept.addEventListener("click", async () => {
          ids.forEach(async (id) => {
            await update(id);
            await createFirstMessage(userData.from);
          });
          card.remove();
        });

        const buttonReject = document.createElement("button");
        buttonReject.textContent = "Reject";
        
        
        buttonReject.addEventListener("click", async () => {

          console.log("Rejected");

          deleteChatInvite(ids[index]);

          card.remove();
        });

        card.appendChild(img);
        card.appendChild(label);
        card.appendChild(buttonAccept);
        card.appendChild(buttonReject);

        cardContainer.appendChild(card);
      });
    }
  } catch (e) {
    console.error("Error getting data: ", e);
  }
}

async function getPicture(username) {
  try {
    const querySnapshot = await db.collection("Profile").where("username", "==", username).get();
    let profilePicture = "";
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      profilePicture = userData.profile_picture;
    });
    return profilePicture;
  } catch (e) {
    console.error("Error getting picture: ", e);
    return ""; 
    
  }
}

async function update(id) {
  try {
    await db.collection("chatInvite").doc(id).update({
      Accepted: true
    });
    console.log("Successfully updated");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

async function deleteChatInvite(docId) {
  try {
    await db.collection("chatInvite").doc(docId).delete();
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error removing document: ", error);
  }
}


async function createFirstMessage(to) {
  const time = await fetchCurrentTime();

  try {
    await db.collection("Message").add({
      From: localStorage.getItem("username"),
      To: to,
      message: "Chat request accepted",
      time: [time] 
    });
    console.log("Message created successfully");
  } catch (e) {
    console.error("Error creating message: ", e);
  }
  try {
    const time = await fetchCurrentTime();
    await db.collection("Message").add({
      From: to,
      To: localStorage.getItem("username"),
      message: "Chat request accepted",
      time: [time]
    });

    console.log("Message created successfully");
  } catch (e) {
    console.error("Error creating message: ", e);
  }
}

getData();

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