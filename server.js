const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS, images) from the current directory
app.use(express.static(__dirname));

// Route for the home page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for other pages inside the "pages" directory
app.get('/save-earth', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'save-earth.html'));
});

app.get('/save-tree', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'save-tree.html'));
});

app.get('/save-water', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'save-water.html'));
});

// Handle 404 errors (for any unknown route)
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
