const { Pool } = require('pg');

const pool = new Pool({
  user: 'u0_a350',
  host: 'localhost',
  database: 'deo_db',
  password: '',
  port: 5432,
});

// Test de connexion
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('❌ Erreur PostgreSQL:', err.message);
  } else {
    console.log('✅ PostgreSQL connecté avec succès');
  }
});

module.exports = pool;
