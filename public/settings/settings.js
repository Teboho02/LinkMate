
function saveAccountSettings() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Save the account settings
    console.log('Account Settings Saved:', { username, email, password });
    alert('Account settings saved successfully!');
}

function savePrivacySettings() {
    const profileVisibility = document.getElementById('profileVisibility').value;
    const searchVisibility = document.getElementById('searchVisibility').value;
    // Save the privacy settings
    console.log('Privacy Settings Saved:', { profileVisibility, searchVisibility });
    alert('Privacy settings saved successfully!');
}

function submitHelpQuery() {
    const helpQuery = document.getElementById('helpQuery').value;
    // Submit the help query
    console.log('Help Query Submitted:', { helpQuery });
    alert('Help query submitted successfully!');
}

async function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {

        //delete all the items in the database with the corresponding id

        const username = localStorage.getItem("username");


        const res = await db.collection('users').doc(username).delete();
        const res2 = await db.collection('Profile').doc(username).delete();
        
        localStorage.clear();

        window.location.href = "../index.html" ;

        console.log('Account deleted');
        alert('Your account has been deleted.');
    }
}

function signOut() {
    // Perform sign-out logic here
    localStorage.clear();

    window.location.href = "../index.html" ;

    console.log('Signed out');
    alert('You have been signed out.');
}
