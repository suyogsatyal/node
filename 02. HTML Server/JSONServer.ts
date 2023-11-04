'use strict';

// Import the Node.js 'fs' and 'http' modules.
const fs = require("fs");
const http = require("http");

// Define the server's port, host, and file path.
const port = 8000;
const host = "localhost";
const path = './files/sample.json';

// Create an HTTP server that handles incoming requests.
const server = http.createServer((req: any, res: any) => {
    // Set the response header with a 200 status code and 'text/json' content type.
    res.writeHead(200, { 'Content-Type': 'text/json' });

    // Read the contents of the 'sample.json' file.
    fs.readFile(path, (err: any, data: any) => {
        if (err) {
            // If there's an error, log an error message to the console.
            console.log("Error: " + err);
            res.end();
        }

        // Log a message indicating that the server is serving and specify the host and port.
        console.log("Serving on http://" + host + ":" + port);

        // Convert the data from a Buffer to a string for easier handling.
        data = data.toString();

        // Write the content of the 'sample.json' file to the response.
        res.write(data);

        // End the response, sending it to the client.
        res.end();
    });
});

// Start the server on the specified port and host.
server.listen(port, host);
