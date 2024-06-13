export class refresh{
    
    constructor(username){
        const myUsername = localStorage.getItem("username");
        this.username = username;
        const firebaseConfig = {
            apiKey: "AIzaSyDFBwd8yFSrkKvZikexNWb8VMRozAe1mEk",
            authDomain: "find-my-patner.firebaseapp.com",
            projectId: "find-my-patner",
            storageBucket: "find-my-patner.appspot.com",
            messagingSenderId: "892330665624",
            appId: "1:892330665624:web:1d597128bb74982e9a52ed"
          };
          
          firebase.initializeApp(firebaseConfig);
          const db = firebase.firestore();
          

    }

    
     checkNewMessages = ()=>{

        let messages = [];

        async function getData(username) {
            try {
                const querySnapshot = await db.collection("Message").get();
                let isValidUser = false;
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    
                    if(JSON.parse(JSON.stringify(doc.data())).To == username ){
                        messages.push(JSON.parse(JSON.stringify(doc.data())));
                    }

                }); 

                return messages;
        
            } catch (e) {
                console.error("Error getting data: ", e);
            }
        }

        getData(myUsername);
        


    }

    checknewRequest = ()=>{


    }



}