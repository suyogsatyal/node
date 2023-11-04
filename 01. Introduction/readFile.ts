'use strict';

// Import the Node.js 'fs' module to work with the file system.
const fs = require('fs');

// Define the file path and encoding as constants for clarity.
const path = './files/sample.txt';

// Using 'utf8' as the encoding ensures data is directly converted from a buffer to a string.
const encoding = 'utf8';
// Alternatively, you can convert the data to a string without specifying the encoding parameter as follows before console.log()ing the data:
// data = data.toString();


// Read the contents of the 'sample.txt' file.
fs.readFile(path, encoding, (err, data) => {
    if (err) {
        // If there's an error, log an error message to the console.
        console.error('Error reading file: ' + err);
        return;
    }

    // Log a message indicating that we're displaying the file content.
    console.log('File Content:');

    // Display the content of the file.
    console.log(data);
});
