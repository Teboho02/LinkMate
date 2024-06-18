const name = document.getElementById("name");
const age = document.getElementById("age");
const bio = document.getElementById("bio");
const lookingfor = document.getElementById("looking");
const profileContainer = document.getElementById("profileContainer");
const preferredGender = document.getElementById('genderSelect');
const lookingFor = document.getElementById('lookingForSelect');
const minAge = document.getElementById('minAge');
const maxAge = document.getElementById('maxAge');
const filterButton = document.getElementById('filterButton');

function encryptData(plainText, secretKey) {
    const encryptedData = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    return encryptedData;
}

function decryptData(encryptedData, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
}

console.log("runni ", encryptData("32", "32"));





filterButton.addEventListener("click", async () => {



    const minimumage = minAge.value;
    const maximumAge = maxAge.value;
    const gender = preferredGender.value;
    const intent = lookingFor.value;



    profileContainer.innerHTML = "";
    createNavigationMenu();


    const res = await (findusers(minimumage, maximumAge, gender, intent));


    getProfiles(res);




})


async function getProfiles(valid_names) {
    const myUsername = localStorage.getItem("username");

    try {
        const querySnapshot = await db.collection("Profile").get();

        // Step 1: Extract documents into an array
        const docsArray = querySnapshot.docs.slice(); // `.slice()` to create a shallow copy

        // Step 2: Shuffle the array using Fisher-Yates shuffle algorithm
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        const shuffledDocs = shuffle(docsArray);

        
    

        // Step 3: Iterate over the shuffled array
        for (const doc of shuffledDocs) {
            const jsonData = doc.data();
            const userId = doc.id;
            const userAge = await getAge(userId);

            console.log(valid_names.includes(jsonData.username));
            console.log(jsonData.username);
            if (valid_names.includes(jsonData.username) && jsonData.username != localStorage.getItem("username")) {

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

                cardImage.addEventListener("click", ()=>{
                    alert("cliked");
                })



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
                button.addEventListener("click", function () {
                    const likedUsername = jsonData.username;
                    uploadInformation(myUsername, likedUsername);
                });
                card.appendChild(button);

                profileContainer.appendChild(card);
            }
        }
    } catch (e) {
        console.error("Error getting data: ", e);
    }
}



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

function createNavigationMenu() {
    const navMenu = document.createElement("ul");

    const links = [
        { href: "../home/home.html", text: "Home", iconClass: "fa fa-home" },
        { href: "../messages/contacts.html", text: "Messages", iconClass: "fa fa-envelope" },
        { href: "../profile/profile.html", text: "Profile", iconClass: "fa fa-user" },
        { href: "../requests/request.html", text: "Chat Requests", iconClass: "fa fa-comments" }
    ];

    links.forEach(link => {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.href = link.href;
        
        const icon = document.createElement("i");
        icon.className = link.iconClass;
        
        anchor.appendChild(icon);
        anchor.appendChild(document.createTextNode(link.text));
        
        listItem.appendChild(anchor);
        navMenu.appendChild(listItem);
    });

    document.getElementById('profileContainer').appendChild(navMenu); // Assuming 'profileContainer' is the id of the container element
}




async function findusers(minimumage, maximumAge, gender, intent) {
    try {
        const results = [];
        const querySnapshot = await db.collection("users").get();
        let isValidUser = false;
        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            //console.log("sa ",.gender);
            let goodage = parseInt(userData.age) >= minimumage && parseInt(userData.age) <= maximumAge;
            if (userData.gender == gender && goodage) {
                results.push(userData.username);
            }
            else if (gender == "all" && goodage) {
                results.push(userData.username);
            }
        });
        
        return results;


    } catch (e) {
        console.error("Error getting data: ", e);
    }
}

