async function getData() {
    console.log("running");
    try {
        const myUsername = localStorage.getItem("username");
        let req = [];
        const querySnapshot = await db.collection("chatInvite").get();

        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.to === myUsername) {
                req.push(userData);
            }
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });

        // Check if there are requests to display
        if (req.length > 0) {
            const cardContainer = document.querySelector('.card__content'); // Assuming you have a container for cards

            // Loop through each request data
            req.forEach((userData) => {
                // Create card elements
                const card = document.createElement('div');
                card.classList.add('card'); // Add class 'card'

                const img = document.createElement('img');
                img.src = "../asserts/3135715.png";
                img.style.width = "45px";
                img.style.height = "45px";

                const label = document.createElement('label');
                label.id = "personName";
                label.textContent = `${userData.from} has requested to chat with you`;

                const buttonAccept = document.createElement('button');
                buttonAccept.id = "accept";
                buttonAccept.textContent = "Accept";

                buttonAccept.addEventListener("click", ()=>{
                    //delete the entry
                    //create a new message between the 2
                    

                })

                const buttonReject = document.createElement('button');
                buttonReject.id = "reject";
                buttonReject.textContent = "Reject";

                // Append elements to card
                card.appendChild(img);
                card.appendChild(label);
                card.appendChild(buttonAccept);
                card.appendChild(buttonReject);

                // Append card to container
                cardContainer.appendChild(card);
            });
        }

    } catch (e) {
        console.error("Error getting data: ", e);
    }
}


getData();