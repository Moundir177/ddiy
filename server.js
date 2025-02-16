import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// In-memory data storage (simulated database)
let bankData = [];
let operationNumberCounter = 1;

// Serve static files from the "public" directory
app.use(express.static(join(__dirname, 'public')));
app.use(express.json()); // Middleware to parse JSON request bodies

// Login endpoint (simulated authentication)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'caissier@nedjm.com' && password === 'password123') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Save data endpoint
app.post('/api/data', (req, res) => {
  const newData = { ...req.body, operationNumber: operationNumberCounter++ };
  bankData.push(newData);
  res.json({ success: true, data: newData });
});

// Get all data endpoint
app.get('/api/data', (req, res) => {
  res.json({ success: true, data: bankData });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
