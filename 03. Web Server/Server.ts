'use strict';

// Import required modules and packages.
const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const http = require('http');
const logEvents = require('./logScript');

// Create an instance of the EventEmitter class to handle events.
const EventEmitter = require('events');
class Emitter extends EventEmitter{};
const MyEmitter = new Emitter();

// Event listener for 'log' event that triggers the logEvents function.
MyEmitter.on('log', (Msg:string, FileName:string) => {logEvents(Msg, FileName)})

// Define server constants.
const PORT = 3000;
const HOST = 'localhost';

// Function to serve files with appropriate content type.
const serveFile = async (contentType:string, filePath:string, response:any) => {
    try {
        // Read the raw data from the file.
        let rawData: any = await fsp.readFile(filePath);

        // Convert the raw data to a string if it's JSON; otherwise, keep it as is.
        let data: any = contentType === 'application/json' ? JSON.stringify(JSON.parse(rawData)) : rawData.toString();

        // If the content type includes 'image', set the appropriate response header and end the response.
        if (contentType.includes('image')) {
            response.writeHead(200, {'Content-Type': contentType});
            response.end(data);
        }

        // If the file path includes '404.html', set the response header for a 404 status.
        if (filePath.includes('404.html')) {
            response.writeHead(404, {'Content-Type': contentType});
        }

        // End the response with the file data.
        response.end(data);
    } catch (err:any) {
        // If an error occurs, log the error and emit a 'log' event.
        console.error('Error:' + err);
        MyEmitter.emit('log', `${err.name}: \t ${err.message}`, 'errLog.txt');
    }
}

// Create an HTTP server that handles incoming requests.
const server = http.createServer((req:any, res:any) => {
    // Emit a 'log' event to log the requested URL and HTTP method.
    MyEmitter.emit('log', `${req.url}\t ${req.method}`, `reqLog.txt`);

    let contentType:string ='';
    let filePath:string = '';

    // Determine the file extension from the requested URL.
    let extension:string = path.extname(req.url);
    extension = extension === '/' ? '/' : extension;

    // Set content type based on file extension.
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.new':
            contentType = 'text/html';
            break;
        case '.txt':
            contentType = 'text/txt';
            break;
        case '.log':
            contentType = 'text/txt';
            break;
        case '/':
            contentType = 'text/html';
            break;
    }

    // Set the file path based on the requested URL and extension.
    ((extension==='/' && (req.url === '/'))) ? filePath = path.join(__dirname, '/files/views/index.html') :
    (extension==='.log') ? filePath = path.join(__dirname, '/logs/reqLog.txt') :  filePath = path.join(__dirname, '/files/',req.url);

    // Check if the file exists.
    let fileExists:boolean = fs.existsSync(filePath);

    if (fileExists) {
        // If the file exists, serve it with the appropriate content type.
        serveFile(contentType, filePath, res);
    } else {
        // If the file doesn't exist, serve the 404.html page.
        serveFile('text/html', path.join(__dirname, '/files/views/404.html'), res);
    }
});

// Start the server on the specified port and log server information.
server.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}\nRoot Directory: ${__dirname}`);
});
