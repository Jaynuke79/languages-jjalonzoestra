// File: app.js

const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Create a new PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Utility function to get a random word from the database
const getRandomPet = async () => {
  const result = await pool.query('SELECT pet_type, pet_name FROM pets ORDER BY RANDOM() LIMIT 1');
  return result.rows.length > 0 ? result.rows[0].pet_name : 'default';
};

const getRandomPetType = async () => {
  const result = await pool.query('SELECT pet_type FROM pet_types ORDER BY RANDOM() LIMIT 1');
  return result.rows.length > 0 ? result.rows[0].pet_type : 'default';
};

// -------------- ROUTES --------------

// Register a new user
app.post('/register', async (req, res) => {
  const { username } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (username) VALUES ($1) RETURNING *', [username]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login an existing user
app.post('/login', async (req, res) => {
  const { username } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start a new game
app.post('/newPet', async (req, res) => {
  const { userId, petUsername } = req.body;
  try {
    const petType = await getRandomPetType();
    const result = await pool.query('INSERT INTO active_pets (user_id, pet_type, pet_username) VALUES ($1, $2, $3) RETURNING *', [userId, petType, petUsername]);
    await pool.query('INSERT INTO pets (pet_name, pet_type) VALUES ($1, $2)', [petUsername, petType]);
    res.status(201).json({ petId: result.rows[0].id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Gets all pet_names in pets
app.get('/pets', async (req, res) => {
  try {
    const result = await pool.query('SELECT pet_name, pet_type FROM pets');
    if (result.rows.length === 0) {
      res.status(200).json({ table: [] });
    } else {
      res.status(200).json({ table: result.rows });
    }
  } catch (error) {
    res.status(400).json({error : error.message});
  }
})

// Serve the frontend for any other routes not defined above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
