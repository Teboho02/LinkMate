const name = document.getElementById("name");
const age = document.getElementById("age");
const bio = document.getElementById("bio");
const lookingfor = document.getElementById("looking");
const profileContainer = document.getElementById("profileContainer");

async function getProfiles() {
    const myUsername = localStorage.getItem("username");

    try {
        const querySnapshot = await db.collection("Profile").get();
        for (const doc of querySnapshot.docs) {
            const jsonData = doc.data();
            const userId = doc.id;
            const userAge = await getAge(userId);


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

            console.log(jsonData);
            const nameElement = document.createElement("p");
            nameElement.classList.add("card-title");
            nameElement.textContent = userAge.profile_name;
            card.appendChild(nameElement);

            const ageElement = document.createElement("p");
            ageElement.classList.add("card-title");
            ageElement.textContent = `Age: ${userAge.age}`;
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
            button.textContent = "Invite to chat";

            // Send a message request
            button.addEventListener("click", function() {
                const likedUsername = jsonData.username;
                uploadInformation(myUsername, likedUsername);
            });
            card.appendChild(button);

            profileContainer.appendChild(card);
        }
    } catch (e) {
        console.error("Error getting data: ", e);
    }
}

getProfiles();

async function uploadInformation(user1, user2) {
    try {
        const docRef = await db.collection("chatInvite").add({
            Accepted: false,
            from: user1,
            to: user2,
            date: new Date().toISOString()
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function getAge(userId) {
    try {
        const doc = await db.collection("users").doc(userId).get();
        if (doc.exists) {
            return doc.data();
        } else {
            return "Unknown";
        }
    } catch (e) {
        return "Error";
    }
}

// async function profileName(userId) {
//     try {
//         const doc = await db.collection("users").doc(userId).get();
//         if (doc.exists) {
//             return doc.data().profile_name;
//         } else {
//             return "Unknown";
//         }
//     } catch (e) {
//         return "Error";
//     }
// }

