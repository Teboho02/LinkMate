const CryptoJS = require('crypto-js'); // Make sure to install crypto-js using npm

let sec = "yes";

function encryptData(plainText, secretKey) {
  const encryptedData = CryptoJS.AES.encrypt(plainText, secretKey).toString();
  return encryptedData;
}

function decryptData(encryptedData, secretKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
}

console.log(encryptData("yes",sec));