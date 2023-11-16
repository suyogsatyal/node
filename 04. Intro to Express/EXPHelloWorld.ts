'use strict';

// Import the Express.js framework.
const express = require('express');

// Create an instance of the Express application.
const app = express();

// Define the server's port.
const port = 3000;

// Define a route that handles HTTP GET requests to the root path ('/').
app.get('/', (_req: any, res: any) => {
    // Respond with the message 'Hello World!' when someone accesses the root path.
    res.send('Hello World!');
})

app.get('/test', (_req: any, res: any) => {
    res.send('Hello World This is test!');
});

app.get('/secondTest', (_req: any, res: any) => {
    res.redirect('/test');
});

// Start the Express app, and it will listen on the specified port.
app.listen(port, '127.0.0.2');