let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Show the install button
  document.getElementById('install-button').style.display = 'block';
});

document.getElementById('install-button').addEventListener('click', (e) => {
  // Hide the install button
  document.getElementById('install-button').style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
  });
});
