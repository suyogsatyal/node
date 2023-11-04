'use strict';

// Import the Node.js 'fs' and 'http' modules.
const fs = require("fs");
const http = require("http");

// Define the server's port, host, and the base path for HTML files.
const port = 8000;
const host = "localhost";
let path = './files';

// Create an HTTP server that handles incoming requests.
const server = http.createServer((req: any, res: any) => {
    switch (req.url) {
        case '/':
            // If the request is for the root path, set 'path' to serve 'index.html'.
            path = './files/index.html';
            break;
        case '/about':
            // If the request is for the '/about' path, set 'path' to serve 'about.html'.
            path = './files/about.html';
            break;
        case '/contact':
            // If the request is for the '/contact' path, set 'path' to serve 'contact.html'.
            path = './files/contact.html';
            break;
        default:
            // Handle other routes by responding with a 404 error.
            res.statusCode = 404;
            res.end('Not Found');
            return;
    }

    // Set the response header with a 200 status code and 'text/html' content type.
    res.writeHead(200, {'Content-Type': 'text/html'});

    // Read the contents of the specified HTML file.
    fs.readFile(path, 'utf8', (err: any, data: any) => {
        if (err) {
            // If there's an error, log an error message to the console and send the error message as a response.
            console.error("Error: " + err);
            res.end(err);
        }

        // Write the content of the HTML file to the response.
        res.write(data);

        // End the response, sending it to the client.
        res.end();
    });
});

// Start the server on the specified port and host.
server.listen(port, host);
