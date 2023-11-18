const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { format } = require('date-fns');
const path = require('path')

const PORT = 5000;
const HOST = '127.0.0.1';

const dbPath = path.join(__dirname, '../db', 'formData.db')
const db = new sqlite3.Database(dbPath);

const app = express();
app.use(cors());
app.use(express.json());

interface FormDataFormat {
    firstName: string;
    middleName: string;
    lastName: string;
    age: number;
    email: string;
}


app.get('/', (_req: any, res: any) => {
    res.send('Hello Backend');
})

app.get('/all', (_req: any, res: any) => {
    const sql = 'SELECT * FROM formData';

    db.all(sql, [], (err: any, rows: any) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ data: rows });
    });

})

app.get('/data/:id', (req: any, res: any) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM formData WHERE id = ?';
    const params = [id];

    db.get(sql, params, (err: any, row: any) => {
        if (err) {
            console.error(`Error fetching data: ${err}`);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'Data not found' });
        }
    });
})

app.post('/edit/:id', (req:any, res:any) =>{
    const id = req.params.id;
    const updatedDetails = req.body;
    const dateTime = format(new Date(), 'MM/dd/yyyy, HH:mm:ss:SS');

    const sql = 'UPDATE formData SET firstName = ?, middleName = ?, lastName = ?, age = ?, email = ?, dateTime = ? WHERE id = ?';

    const params = [
        updatedDetails.firstName,
        updatedDetails.middleName,
        updatedDetails.lastName,
        updatedDetails.age,
        updatedDetails.email,
        dateTime,
        id
    ];

    // const lastID = this.lastID; 
    db.run(sql, params, function (this: any, err: any) {
        if (err) {
            console.error(`Error: ${err}`);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(`Change made`);

    });

    // console.log(result)
    res.send('Data received and edited successfully!');
})

app.post('/delete/:id', (req:any, res:any) =>{
    const id = req.params.id;

    const sql = 'DELETE FROM formData WHERE id = ?';

    const params = [id];

    // const lastID = this.lastID; 
    db.run(sql, params, function (this: any, err: any) {
        if (err) {
            console.error(`Error: ${err}`);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(`Change made`);

    });

    // console.log(result)
    res.send('Data received and edited successfully!');
})
    

app.post('/submit-form', async (req: any, res: any) => {
    const requestData: FormDataFormat = req.body;
    const dateTime = format(new Date(), 'MM/dd/yyyy, HH:mm:ss:SS');

    const sql: string = 'UPDATE formData (firstName, middleName, lastName, age, email, dateTime) VALUES (?, ?, ?, ?, ?, ?)'

    const params = [
        requestData.firstName,
        requestData.middleName,
        requestData.lastName,
        requestData.age,
        requestData.email,
        dateTime,
    ];

    // const lastID = this.lastID; 
    db.run(sql, params, function (this: any, err: any) {
        if (err) {
            console.error(`Error: ${err}`);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(`Row added with ID: ${this?.lastID}`);

    });

    // console.log(result)
    res.send('Data received and saved successfully!');
})



app.listen(PORT, HOST, () => {
    console.log(`Serving on http://${HOST}/${PORT}`);
});