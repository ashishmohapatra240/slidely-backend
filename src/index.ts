import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 3000;
const DB_FILE = 'db.json';

app.use(bodyParser.json());

// Endpoint to check server status
app.get('/ping', (req: Request, res: Response) => {
    res.send(true);
});

// Endpoint to submit a new form entry
app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).send('All fields are required');
    }

    const newEntry = { name, email, phone, github_link, stopwatch_time };

    // Read existing entries
    let data = [];
    if (fs.existsSync(DB_FILE)) {
        try {
            const rawData = fs.readFileSync(DB_FILE);
            data = JSON.parse(rawData.toString());
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(500).send('Internal server error');
        }
    }

    // Add new entry
    data.push(newEntry);

    // Write updated data back to file
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing JSON:', error);
        return res.status(500).send('Internal server error');
    }

    res.status(201).send('Form submitted successfully');
});

// Endpoint to read a specific form entry by index
app.get('/read', (req: Request, res: Response) => {
    const { index } = req.query;

    if (typeof index !== 'string' || isNaN(Number(index))) {
        return res.status(400).send('Index must be a number');
    }

    const idx = parseInt(index, 10);

    // Read existing entries
    if (fs.existsSync(DB_FILE)) {
        try {
            const rawData = fs.readFileSync(DB_FILE);
            const data = JSON.parse(rawData.toString());

            if (idx >= 0 && idx < data.length) {
                return res.status(200).json(data[idx]);
            } else {
                return res.status(404).send('Index out of range');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(500).send('Internal server error');
        }
    } else {
        return res.status(404).send('No submissions found');
    }
});

// Endpoint to delete a specific form entry by index
app.delete('/delete', (req: Request, res: Response) => {
    const { index } = req.query;

    if (typeof index !== 'string' || isNaN(Number(index))) {
        return res.status(400).send('Index must be a number');
    }

    const idx = parseInt(index, 10);

    // Read existing entries
    if (fs.existsSync(DB_FILE)) {
        try {
            const rawData = fs.readFileSync(DB_FILE);
            let data = JSON.parse(rawData.toString());

            if (idx >= 0 && idx < data.length) {
                data.splice(idx, 1);
                fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
                return res.status(200).send('Form deleted successfully');
            } else {
                return res.status(404).send('Index out of range');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(500).send('Internal server error');
        }
    } else {
        return res.status(404).send('No submissions found');
    }
});

// Endpoint to edit a specific form entry by index
app.put('/edit', (req: Request, res: Response) => {
    const { index } = req.query;
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).send('All fields are required');
    }

    if (typeof index !== 'string' || isNaN(Number(index))) {
        return res.status(400).send('Index must be a number');
    }

    const idx = parseInt(index, 10);

    // Read existing entries
    if (fs.existsSync(DB_FILE)) {
        try {
            const rawData = fs.readFileSync(DB_FILE);
            let data = JSON.parse(rawData.toString());

            if (idx >= 0 && idx < data.length) {
                data[idx] = { name, email, phone, github_link, stopwatch_time };
                fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
                return res.status(200).send('Form updated successfully');
            } else {
                return res.status(404).send('Index out of range');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(500).send('Internal server error');
        }
    } else {
        return res.status(404).send('No submissions found');
    }
});

// Endpoint to search for form entries by email
app.get('/search', (req: Request, res: Response) => {
    const { email } = req.query;

    if (typeof email !== 'string') {
        return res.status(400).send('Email must be a string');
    }

    // Read existing entries
    if (fs.existsSync(DB_FILE)) {
        try {
            const rawData = fs.readFileSync(DB_FILE);
            const data = JSON.parse(rawData.toString());
            const results = data.filter((entry: any) => entry.email === email);

            if (results.length > 0) {
                return res.status(200).json(results);
            } else {
                return res.status(404).send('No entries found for the provided email');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(500).send('Internal server error');
        }
    } else {
        return res.status(404).send('No submissions found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
