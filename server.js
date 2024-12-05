// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Add cache control headers
app.use((req, res, next) => {
  // Cache for 1 day
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('CSS CDN Server is running!');
});

// Specific route for CSS files
app.get('/css/:filename', (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(__dirname, 'public', 'css', filename));
});

app.listen(port, () => {
  console.log(`CDN server running at http://localhost:${port}`);
});