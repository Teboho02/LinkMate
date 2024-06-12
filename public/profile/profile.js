document.addEventListener("DOMContentLoaded", function() {
    const nameLabel = document.getElementById("nameLabel");
    const ageLabel = document.getElementById("ageLabel");
    const genderLabel = document.getElementById("genderLabel");
    const profilePicture = document.getElementById("profile_picture");
    const fileInput = document.getElementById("fileInput"); 
    const updatePro = document.getElementById("updateProfile");
    const bio = document.getElementById("bio");
    let profileString = "";


    const username = localStorage.getItem("username");

    const myData = showInfo(username);
    checkProfile(username);


    
    //check if profile exist for the user


    profilePicture.addEventListener("click", function() {
        fileInput.click();
    });


    updatePro.addEventListener("click", ()=>{

    

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
                bio : "myBio"
            });
            console.log("elements inserted successfully ");
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
                if(myD.username == username){
                    console.log("tes");
                    profilePicture.src = myD.profile_picture;
                    return true;
                }
            }); 
    
        } catch (e) {
            console.error("Error getting data: ", e);
        }
    }

    
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


