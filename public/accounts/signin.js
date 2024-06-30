const username = document.getElementById("username");
const password = document.getElementById("password");
const si = document.getElementById("sii");

if(localStorage.getItem("username") != null){
   //TODOs uncomment later
   // window.location.href = "./profile/profile.html"
}
fun();
async function fun(){

    try {
        const response = await fetch('/api/time', {
          method: 'GET',

        });
    
        const result = await response.json();
        if (response.ok) {
          console.log(result);
        } else {
          console.error('Error:', result.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    
    

}




async function getData(username, password) {

    const userDocRef = db.collection("users").doc(username);

    const userDocSnap = await userDocRef.get();

        return userDocSnap.data().password == password ? true : false;
      
}

si.addEventListener("click", async () => {

    const result = await getData(username.value, password.value);

    if (result) {
        localStorage.setItem("username",username.value);
        window.location.href = "./profile/profile.html";

    } else {
        alert("Invalid username or password");
    }
});

