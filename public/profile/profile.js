document.addEventListener("DOMContentLoaded", function() {
    const nameLabel = document.getElementById("nameLabel");
    const ageLabel = document.getElementById("ageLabel");
    const genderLabel = document.getElementById("genderLabel");
    const profilePictureInput = document.getElementById("profile_picture");
    const pic = document.getElementById("picLabel");

    const username = localStorage.getItem("username");
    

    const myData = getData(username);



      

    profilePictureInput.addEventListener("change", function() {
        pic.style.display = "none";
        profile_picture_preview.style.display = "";
       
    
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const profilePicturePreview = document.getElementById("profile_picture_preview");
                profilePicturePreview.src = e.target.result;
                profilePicturePreview.style.display = "block"; // Show the <img> tag
            }
            reader.readAsDataURL(file);
        }
    });
});


const userDetails = ()=>{

}

const convertBase64 = (image)=>{

}

async function getData(username) {
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