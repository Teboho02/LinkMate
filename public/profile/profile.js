document.addEventListener("DOMContentLoaded", function() {
    const nameLabel = document.getElementById("nameLabel");
    const ageLabel = document.getElementById("ageLabel");
    const genderLabel = document.getElementById("genderLabel");
    const profilePicture = document.getElementById("profile_picture");
    const fileInput = document.getElementById("fileInput"); 
    const username = localStorage.getItem("username");
    

    const myData = showInfo(username);


    profilePicture.addEventListener("click", function() {
        fileInput.click();
    });


      
    fileInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Update the profile picture src with the selected image
                profilePicture.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    
    // upProfile.addEventListener("click", ()=>{
    //     const mock = {
    //     username: username,
    //     interests: "xt",
    //     bio : "43"
    //     }
    //     uploadInformation(username, mock);
    // })


});


const userDetails = ()=>{

}

const convertBase64 = (image)=>{

}

async function showInfo(username) {
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

                console.log("myData ", myData);
                nameLabel.innerHTML = "Name: " + myData.Name;
                ageLabel.innerHTML = "Age: " + myData.age;
                genderLabel.innerHTML = "Gender "+myData.gender;
                return myData;

            }


        });

    } catch (e) {
        console.error("Error getting data: ", e);
    }
}

async function uploadInformation(username, info) {
    try {
        const docRef = await db.collection("ABOUT").add({
            username: username,
            interests: info.interests,
            bio : info.bio
        });
        console.log("elements inserted successfully ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


