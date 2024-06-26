let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    showInstallPromotion();
});

const installButton = document.getElementById('install-button');
installButton.addEventListener('click', (e) => {
    //hideInstallPromotion();
    // Show the install prompt if available
    if (deferredPrompt) {
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
            })
            .catch((error) => {
                console.error('Error during installation prompt:', error);
                deferredPrompt = null;
            });
    }
});
