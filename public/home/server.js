const http = require('http');
const fs = require('fs'); // For reading files
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const PORT = 3000; // Choose a port for your server

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/api/get-env' && method === 'GET') {
        try {
            const apiKey = process.env.API_KEY;

            if (!apiKey) {
                throw new Error('API_KEY environment variable not found');
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ NEXT_PUBLIC_API_KEY: apiKey }));
        } catch (error) {
            console.error('Error fetching env variables:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
        }
    } else {
        // Handle other routes or serve static files
        const filePath = url === '/' ? './home.html' : '.' + url;

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
