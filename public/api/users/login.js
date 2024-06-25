const config = require("../config.js");

export async function GET(req) {
  const a = {
    text: "HELLO WORLD",
    age: "20"
  };

  return new Response(JSON.stringify(a), {
    headers: { 'Content-Type': 'application/json' }
  });
}
