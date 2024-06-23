const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Endpoint to serve HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Endpoint to get vegetables data
app.get('/api/vegetables', (req, res) => {
    fs.readFile('vegetables.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to read vegetables.json' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to save vegetables data
app.post('/api/vegetables', (req, res) => {
    const newData = JSON.stringify(req.body, null, 2);
    fs.writeFile('vegetables.json', newData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to write vegetables.json' });
            return;
        }
        res.json({ message: 'Vegetables data saved successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
