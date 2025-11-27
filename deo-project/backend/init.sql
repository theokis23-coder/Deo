CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(20),
  name VARCHAR(100),
  email VARCHAR(255),
  password VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(500),
  is_vip BOOLEAN DEFAULT false,
  credits INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  content TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER,
  receiver_id INTEGER,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (phone, name, email, password, bio) VALUES 
('+33612345678', 'Admin DEO', 'admin@deo.com', 'test', 'Bienvenue sur DEO !'),
('+33687654321', 'Test User', 'user@deo.com', 'test', 'Nouvel utilisateur');

INSERT INTO posts (user_id, content) VALUES 
(1, '🌟 Bienvenue sur DEO avec PostgreSQL !'),
(2, 'Super application sociale ! 🚀');
