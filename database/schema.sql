-- Run this file in psql or pgAdmin to set up the database

-- Create the database (run this separately if needed):
-- CREATE DATABASE loginapp;

-- Connect to loginapp, then run:

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verify the table was created:
-- SELECT * FROM users;

-- To create test users, use the /signup API endpoint.
-- Passwords are bcrypt-hashed, so direct SQL inserts require pre-hashed values.
-- Example: POST http://localhost:5000/signup  { "username": "alice", "password": "secret123" }
