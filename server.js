// ...existing code...
const http = require('http');
const server = http.createServer(); // Create an HTTP server instance

const WebSocket = require('ws');

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

// ...existing code...
