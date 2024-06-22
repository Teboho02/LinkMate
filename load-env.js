const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const envVariables = {
  API_KEY: process.env.API_KEY,
  AUTH_DOMAIN: process.env.AUTH_DOMAIN,
};

// Write the JSON object to a file
fs.writeFileSync('./env.json', JSON.stringify(envVariables, null, 2));
