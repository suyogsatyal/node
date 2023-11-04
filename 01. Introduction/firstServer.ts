'use strict';

//Run using nodemon

// Import the Node.js 'http' module to create an HTTP server.
const http = require('http');

// Define the server's host and port.
const host = "127.0.0.1";
const port = 420;

// Create an HTTP server that handles incoming requests.
const server = http.createServer((_req: any, res: any) => {
    // Set the response header with a 200 status code and 'text/plain' content type.
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Write the response body with the message 'Hello Server!'
    res.write('Hello Server!')

    // End the response, sending it to the client.
    res.end();
})

// Start the server, and handle any errors if it fails to start.
server.listen(port, host, (error: any) => {
    if (error) {
        // If there's an error, log an error message to the console.
        console.error("Error: " + error)
    }
    // Log a message indicating that the server is running and specify the host and port.
    console.log("Server is running on http://" + host + ":" + port)
})
