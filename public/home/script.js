const name = document.getElementById("name");
const age = document.getElementById("age");
const bio = document.getElementById("bio");
const lookingfor = document.getElementById("looking");

const profileContainer = document.getElementById("profileContainer");

async function getProfiles() {
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

            const name = document.createElement("p");
            name.classList.add("card-title");
            name.textContent = jsonData.username;
            card.appendChild(name);

            const age = document.createElement("p");
            age.classList.add("card-title");
            age.textContent = `Age: ${jsonData.age}`;
            card.appendChild(age);
            let l = "";
            if(jsonData.friendship){
                if(jsonData.relationship){
                    l = "friendship and relationship";
                }else{
                    l = "friendship";
                }   
            }else{
                l = " relationship";
            }

            const lookingFor = document.createElement("p");
            lookingFor.classList.add("card-title");
            lookingFor.textContent = `Looking for: ${l}`;
            card.appendChild(lookingFor);
  

            const bio = document.createElement("p");
            bio.classList.add("card-body");
            bio.textContent = jsonData.bio;
            card.appendChild(bio);

            const button = document.createElement("button");
            button.classList.add("btn");
            button.textContent = "Like";
            card.appendChild(button);

            
            


            profileContainer.appendChild(card);
        });

    } catch (e) {
        console.error("Error getting data: ", e);
    }
}

getProfiles();
