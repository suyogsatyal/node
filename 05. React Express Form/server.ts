// Import required modules and packages related to Express and server functionality.
const express = require('express'); // Express.js for building web applications.
const fs = require('fs'); // Node.js 'fs' module for file system operations.
const fsp = require('fs').promises; // Promisified version of the 'fs' module for asynchronous file system operations.
const path = require('path'); // Node.js 'path' module for working with file and directory paths.
const cors = require('cors'); // CORS (Cross-Origin Resource Sharing) middleware for Express.
const format = require('date-fns/format'); // Library for formatting dates.

const PORT = 5000; // Define the port for the server.
const HOST = '127.0.0.1'; // Define the host for the server.

const app = express(); // Create an instance of the Express application.

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
app.use(cors());

// Parse incoming JSON requests.
app.use(express.json());

// Define a route for the root path that returns a simple 'Hello' message.
app.get('/', (_req: any, res: any) => {
    res.end('Hello');
});

// Define a route for handling POST requests to '/submit-form'.
app.post('/submit-form', async (req: any, res: any) => {
    // Extract data from the request body.
    const requestData = req.body;

    // Get the current date and time formatted.
    const dateTime = format(new Date(), 'MM/dd/yyyy' + ", " + 'HH:mm:ss:SS');

    // Format the data into a string for appending to 'RawData.txt'.
    const formattedData = `${requestData.firstName}${requestData.middleName ? ' ' + requestData.middleName + ' ' : ' '}${requestData.lastName}, ${requestData.age}, ${requestData.email}, ${dateTime}\n`;

    try {
        // Create a 'data' directory if it doesn't exist.
        if (!fs.existsSync(path.join(__dirname, 'data'))) {
            await fsp.mkdir(path.join(__dirname, 'data'));
        }

        // Append the formatted data to 'RawData.txt'.
        await fsp.appendFile(path.join(__dirname, 'data', 'RawData.txt'), `${formattedData}`);

        // Define the file path for 'FormData.json'.
        const filePath = path.join(__dirname, 'data', 'FormData.json');

        // Read existing data from 'FormData.json', if it exists.
        let existingData: { firstName: string, middleName: string, lastName: string, age: number, email: string, dateTime: string }[] = [];
        if (fs.existsSync(filePath)) {
            const fileContent = await fsp.readFile(filePath, 'utf-8');
            existingData = JSON.parse(fileContent);
        }

        // Add the current submission to the existing data.
        existingData.push({
            firstName: requestData.firstName,
            middleName: requestData.middleName,
            lastName: requestData.lastName,
            age: requestData.age,
            email: requestData.email,
            dateTime: dateTime, // Adding the date and time to each submission
        });

        // Write the updated data back to 'FormData.json'.
        await fsp.writeFile(filePath, JSON.stringify(existingData, null, 2));

        console.log('Data saved to FormData.json');
    } catch (err: any) {
        // Handle errors and send a 500 Internal Server Error response.
        console.error(`Error saving data: ${err.message}`);
        res.status(500).send('Internal Server Error');
        return;
    }

    // Send a success response to the client.
    res.send('Data received and saved successfully!');
});

// Start the server and listen on the specified port and host.
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
