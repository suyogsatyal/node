'use strict';

// Import the Node.js 'fs' and 'http' modules.
const fs = require('fs');
const http = require('http');

// Define the server's port, host, file path, and encoding.
const port = 8000;
const host = "localhost";
const path = "./files/sample.html";
const encoding = "utf8";

// Create an HTTP server that handles incoming requests.
const server = http.createServer((req: any, res: any) => {
    // Set the response header with a 200 status code and 'text/html' content type.
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Read the contents of the 'sample.html' file.
    fs.readFile(path, encoding, (err: any, data: any) => {
        if (err) {
            // If there's an error, log an error message to the console.
            console.error("Error: " + err);
            res.end();
        }
        // Log a message indicating that the server is working and specify the host and port.
        console.log("Working on http://" + host + ":" + port);

        // Write the content of the 'sample.html' file to the response.
        res.write(data);

        // End the response, sending it to the client.
        res.end();
    });
});

// Start the server on the specified port and host.
server.listen(port, host);
