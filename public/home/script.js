const name = document.getElementById("name");
const age = document.getElementById("age");
const bio = document.getElementById("bio");
const lookingfor = document.getElementById("looking");
const profileContainer = document.getElementById("profileContainer");

async function getProfiles() {

    const myUsername = localStorage.getItem("username");

    try {
        const querySnapshot = await db.collection("Profile").get();
        
        querySnapshot.forEach((doc) => {
            const jsonData = doc.data();

            const card = document.createElement("div");
            card.classList.add("card");

            const cardImage = document.createElement("div");
            cardImage.classList.add("card-image");
            const image = document.createElement("img");
            image.src = jsonData.profile_picture;
            image.style.maxWidth = "100%";
            image.style.maxHeight = "100%";
            cardImage.appendChild(image);
            card.appendChild(cardImage);

            const nameElement = document.createElement("p");
            nameElement.classList.add("card-title");
            nameElement.textContent = jsonData.username;
            card.appendChild(nameElement);

            const ageElement = document.createElement("p");
            ageElement.classList.add("card-title");
            ageElement.textContent = `Age: ${jsonData.age}`;
            card.appendChild(ageElement);

            let lookingForText = "";
            if (jsonData.friendship) {
                if (jsonData.relationship) {
                    lookingForText = "Friendship and Relationship";
                } else {
                    lookingForText = "Friendship";
                }
            } else {
                lookingForText = "Relationship";
            }

            const lookingForElement = document.createElement("p");
            lookingForElement.classList.add("card-title");
            lookingForElement.textContent = `Looking for: ${lookingForText}`;
            card.appendChild(lookingForElement);

            const bioElement = document.createElement("p");
            bioElement.classList.add("card-body");
            bioElement.textContent = jsonData.bio;
            card.appendChild(bioElement);

            const button = document.createElement("button");
            button.classList.add("btn");
            button.textContent = "Like";

            //send a message request
            button.addEventListener("click", function() {

                alert(`Liked ${jsonData.username}`);
                const likedusername = jsonData.username;

              
                uploadInformation(myUsername,likedusername);




            });
            card.appendChild(button);

            profileContainer.appendChild(card);
        });

    } catch (e) {
        console.error("Error getting data: ", e);
    }
}

getProfiles();

async function uploadInformation(user1,user2) {
    try {
        const docRef = await db.collection("chatRequest").doc(user1+user2).set({
                accepted : false,
                from : user1,
                to : user2,
                date : "1 marcj"
        });
        console.log("elements inserted successfully ");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
