'use strict';

// Import the Express.js framework and the Node.js 'fs' module.
const express = require('express');
const fs = require('fs');

// Create an instance of the Express application.
const app = express();

// Define the server's port and the file path.
const port = 3000;
const path = 'files/sample.txt';

// Define a route that handles HTTP GET requests to the root path ('/').
app.get('/', (req: any, res: any) => {
    // Read the contents of the 'sample.txt' file as UTF-8.
    fs.readFile(path, 'utf8', (err: any, data: any) => {
        if (err) {
            // If there's an error, log an error message to the console and send the error as the response.
            console.log('Error: ' + err);
            res.send(err);
        }

        // Send the content of the 'sample.txt' file as the response.
        res.send(data);
    });
});

// Start the Express app and listen on the specified port.
app.listen(port, function (err: any) {
    if (err) {
        console.log(err);
    }
    // Log a message indicating that the server is listening on the specified port.
    console.log("Server listening on http://localhost:" + port);
});
