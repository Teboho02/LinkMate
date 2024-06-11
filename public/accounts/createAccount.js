
console.log("runs");

const user = {
    username: "TN",
    profile_name: "user.profile_name",
    password: "user.password",
    age : "user.age",
    Gender : "user.gender"
}

async function uploadInformation(user) {
    try {
      const docRef = await db.collection("users").add({
        username: user.username,
        profile_name: user.profile_name,
        password: user.password,
        age : user.age,
        Gender : user.gender
      });
      console.log("elements inserted successfully ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  uploadInformation(user);