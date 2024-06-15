
export default function encryptData(plainText, secretKey) {
    const encryptedData = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    return encryptedData;
}

function decryptData(encryptedData, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
}

