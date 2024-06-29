



checkRequests();
async function checkRequests() {

    let count = 0;
    const res = await db.collection("chatInvite").where("to", "==", myUsername).where("Accepted" , "==" , false);

    const querySnapshot = await res.get();
    querySnapshot.forEach((doc) => {
            count++;    
    });
    if(count > 0){
       sessionStorage.setItem("requests", count);
    }
}

async function checkMessages() {

    let read = 0;
    const res = await db.collection("Message").where("To", "==", myUsername).where("read" , "==" , false);

    const querySnapshot = await res.get();
    querySnapshot.forEach((doc) => {
        const userdata = doc.data();
        
    });

}