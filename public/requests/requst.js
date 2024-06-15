async function getData() {
  console.log("running");
  try {
    const myUsername = localStorage.getItem("username");
    let req = [];
    let ids = [];
    const querySnapshot = await db.collection("chatInvite").get();

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.to === myUsername) {
        req.push(userData);
        ids.push(doc.id);
      }
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });

    // Check if there are requests to display
    if (req.length > 0) {
      const cardContainer = document.querySelector(".card__content"); // Assuming you have a container for cards

      // Loop through each request data
      req.forEach((userData) => {
        // Create card elements

        if(!userData.Accepted){
        const card = document.createElement("div");
        card.classList.add("card"); // Add class 'card'

        const img = document.createElement("img");
        img.src = "../asserts/3135715.png";
        img.style.width = "45px";
        img.style.height = "45px";

        const label = document.createElement("label");
        label.id = "personName";
        label.textContent = `${userData.from} has requested to chat with you`;

        const buttonAccept = document.createElement("button");
        buttonAccept.id = "accept";
        buttonAccept.textContent = "Accept";

        buttonAccept.addEventListener("click", () => {
            console.log("accepted");
          ids.forEach((id) => {
            console.log(id); 
            //update the status   
            update(id);
            //create a message

        
            createfirstMessage(userData.from);  
           
          });
        });

        async function update(id) {
          try {
            const docRef = await db
              .collection("chatInvite")
              .doc(id)
              .update({
                Accepted: true
              });
            console.log("successfully updated ");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }

        async function createfirstMessage(to) {
            try {
                const docRef = await db.collection("Message").add({
                  From : localStorage.getItem("username"),
                  To : to,
                  message : "chat request accepted",
                  time : ["Jun 15 2024, 02:57:50"]
                });
                console.log("elements inserted successfully ", docRef.id);
            } catch (e) {   
                console.error("Error adding document: ", e);
            }
        }


        const buttonReject = document.createElement("button");
        buttonReject.id = "reject";
        buttonReject.textContent = "Reject";

        buttonReject.addEventListener("click" , ()=>{


        })

        // Append elements to card
        card.appendChild(img);
        card.appendChild(label);
        card.appendChild(buttonAccept);
        card.appendChild(buttonReject);

        // Append card to container
        cardContainer.appendChild(card);
      }
      });

    }
  } catch (e) {
    console.error("Error getting data: ", e);
  }
}

getData();
