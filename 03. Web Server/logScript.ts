'use strict';

// Import required modules and packages.
const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const http = require('http');

// Import functions from external packages.
const { v4: uuid } = require('uuid');
const format = require('date-fns/format')

// Define the path for the log file.
const logPath = './logs/log.txt';

// Define a function 'logEvents' that asynchronously logs events with a timestamp and unique ID.
const logEvents = async (message: string, logName: string) => {
    // Get the current date and time formatted.
    const dateTime = format(new Date(), 'MM/dd/yyyy' + "\t" + 'HH:mm:ss:SS');

    // Generate a unique ID using the 'uuid' package.
    const id = uuid();

    // Create a log entry with timestamp and ID.
    const logData = `\n${dateTime} \t${id}`;

    try {
        // Check if the 'logs' directory exists; if not, create it.
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsp.mkdir(path.join(__dirname, 'logs'));
        }

        // Append the log entry and the provided message to the log file.
        await fsp.appendFile(path.join(__dirname, 'logs', logName), `${logData}\t ${message}`);
    } catch (err) {
        // If an error occurs, log an error message and append an error entry to the log file.
        console.error('Error: ' + err);
        await fsp.appendFile(path.join(__dirname, 'logs', logName), `${logData}\t Error`);
    }
}

// Export the 'logEvents' function for use in other parts of the code.
module.exports = logEvents;