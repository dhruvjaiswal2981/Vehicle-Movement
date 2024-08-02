// Import necessary modules
const express = require('express');
const cors = require('cors');
const vehicleData = require('./vehicleData.json');

// Initialize express app
const app = express();

// Use CORS middleware to handle cross-origin requests
app.use(cors());

// Define a route to get vehicle location data
app.get('/vehicle-location', (req, res) => {
  res.json(vehicleData);
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
