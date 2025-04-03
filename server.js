const http = require('http');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
    // Serve static files from the "build" directory
    const filePath = path.join(__dirname, 'build', req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    const allowedExtensions = ['.html', '.js', '.css', '.png', '.jpg', '.ico'];

    if (allowedExtensions.includes(extname)) {
        res.writeHead(200, { 'Content-Type': getContentType(extname) });
        fs.createReadStream(filePath).pipe(res);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

function getContentType(ext) {
    const types = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.ico': 'image/x-icon'
    };
    return types[ext] || 'application/octet-stream';
}

// Create a WebSocket server
const wss = new WebSocket.Server({ server }); // Attach to the existing HTTP server

wss.on('connection', (ws) => {
    console.log('New WebSocket connection established.');

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log('Received:', message);
        // Echo the message back to the client
        ws.send(`Server received: ${message}`);
    });

    // Handle connection close
    ws.on('close', () => {
        console.log('WebSocket connection closed.');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
