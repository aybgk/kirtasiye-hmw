const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint to handle user signup
app.post('/signup', (req, res) => {
    const userData = req.body;

    // Read existing data from data.json
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        // Check if username already exists
        const existingUser = users.find(user => user.username === userData.username);
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Add new user to the array
        users.push(userData);

        // Write updated data back to data.json
        fs.writeFile('data.json', JSON.stringify(users), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(201).json({ message: 'User signed up successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
