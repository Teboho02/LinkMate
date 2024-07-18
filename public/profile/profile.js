document.addEventListener("DOMContentLoaded", function() {
    const nameLabel = document.getElementById("nameLabel");
    const ageLabel = document.getElementById("ageLabel");
    const genderLabel = document.getElementById("genderLabel");
    const profilePicture = document.getElementById("profile_picture");
    const fileInput = document.getElementById("fileInput"); 
    const updatePro = document.getElementById("updateProfile");
    const gotohome = document.getElementById("gotohome");
    const bio = document.getElementById("bio");
    const st = document.getElementById("inter");

    
    const intent= {
        relationship : false,
        friendship : true,
        something_else : ""
    }

    let profileString = "";

    const username = localStorage.getItem("username");

    const myData = showInfo(username);
    checkProfile(username);


    

    profilePicture.addEventListener("click", function() {
        fileInput.click();
    });



    updatePro.addEventListener("click", async ()=>{


        console.log(bio.value);
    

        if (document.getElementById('relationship').checked) {
            intent.relationship = true;
        }
        if (document.getElementById('friendship').checked) {
            intent.friendship = true;

        }

        uploadInformation();





    })

      
    fileInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            async function setBase64(){
                const base64String = await  convertBase64(file);
                profileString = base64String;
            }

            setBase64();
            

            const reader = new FileReader();
            reader.onload = function(e) {
                // Update the profile picture src with the selected image
                profilePicture.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    const convertBase64 = (image) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
    
            reader.onload = () => {
                resolve(reader.result);
            };
    
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };
    

    async function uploadInformation() {
        try {
            const docRef = await db.collection("Profile").doc(username).set({
                username : username,
                profile_picture : profileString,
                bio : bio.value,
                friendship : intent.friendship,
                relationship : intent.relationship,
                interests : st.value
                
            });

            localStorage.setItem("profileComple", "yes");
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        
    try {
        const docRef = await db.collection("userInfo").doc(localStorage.getItem("username")).update({
            profile_picture : profileString
        });

        alert("successfully updated");
        //console.log("successfully updated "  );
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    }


    async function checkProfile(username) {
        try {
            const querySnapshot = await db.collection("Profile").get();
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                
                const myD = JSON.parse(JSON.stringify(doc.data()));
                //check if I have already updated the profile
                if(myD.username == username){
                    localStorage.setItem("profileComple", "yes");
                    bio.textContent = myD.bio;
                    st.textContent =myD.interests;
                    if(myD.relationship){
                        document.getElementById('relationship').checked = true;
                    }
                    if(myD.friendship){
                        document.getElementById('friendship').checked = true;

                    }
                    if(myD.profile_picture.length>1000){
                        profilePicture.src = myD.profile_picture;
                        

                        return true;
                    }
                  
                }
            }); 
    
        } catch (e) {
            console.error("Error getting data: ", e);
        }
    }


});


async function showInfo(username) {
    //on login show the user's profile information
    try {
        const querySnapshot = await db.collection("users").get();

        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            let datax= JSON.parse(JSON.stringify(doc.data()));

            if(datax.username == username){
                
                const myData = {
                    Name : datax.profile_name,
                    age : datax.age,
                    gender : datax.gender,

                }
                nameLabel.innerHTML = "Name: " + myData.Name;
                ageLabel.innerHTML = "Age: " + myData.age;
                return myData;
            }

        });

    } catch (e) {
        console.error("Error getting data: ", e);
    }
}



