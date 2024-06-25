
const config = require("../config.js");


export async function GET(req) {


  const a = {
    text : "hELLOW WORLD",
    age : "20"
  }


    return JSON.parse(a);


}