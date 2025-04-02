-- File: db/init.sql

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS active_pets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  pet_type VARCHAR(50) NOT NULL,
  pet_username VARCHAR(50) NOT NULL,
  pet_hunger INTEGER DEFAULT 100,
  pet_health INTEGER DEFAULT 100,
  pet_happiness INTEGER DEFAULT 100,
  pet_age INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'alive', -- 'alive', 'dead'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pet_states (
  id SERIAL PRIMARY KEY,
  pet_id INTEGER REFERENCES active_pets(id),
  pet_action VARCHAR(1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pet_types (
  id SERIAL PRIMARY KEY,
  pet_type VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO pet_types (pet_type) VALUES ('Fire'), ('Water'), ('Air'), ('Earth');

CREATE TABLE IF NOT EXISTS pets (
  id SERIAL PRIMARY KEY,
  pet_type VARCHAR(50) NOT NULL,
  pet_name VARCHAR(50) UNIQUE NOT NULL
);

-- Optional: Add initial words to the words table
-- INSERT INTO words (word) VALUES ('javascript'), ('nodejs'), ('docker'), ('postgresql'), ('express');
