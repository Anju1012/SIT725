const express = require('express');
const app = express();

// Define a GET route to add two numbers
app.get('/add', (req, res) => {
    // Parse query parameters
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    // Validate input
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid input. Please provide two numbers." });
    }

    // Calculate sum
    const sum = num1 + num2;

    // Send response as JSON
    res.json({ num1, num2, sum });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
