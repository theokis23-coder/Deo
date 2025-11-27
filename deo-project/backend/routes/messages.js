const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware');


router.post('/', auth, async (req, res) => {
  try {
    const { receiver_id, content } = req.body;
    
    if (!receiver_id || !content) {
      return res.status(400).json({ error: 'Destinataire et contenu requis' });
    }

    const q = `INSERT INTO messages (sender_id, receiver_id, content) 
               VALUES ($1, $2, $3) RETURNING *`;
    const result = await pool.query(q, [req.user.id, receiver_id, content]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/conversations', auth, async (req, res) => {
  try {
    const q = `
      SELECT DISTINCT 
        u.id, u.name, u.avatar_url,
        (SELECT content FROM messages 
         WHERE (sender_id = $1 AND receiver_id = u.id) 
         OR (sender_id = u.id AND receiver_id = $1) 
         ORDER BY created_at DESC LIMIT 1) as last_message
      FROM users u
      JOIN messages m ON u.id = m.sender_id OR u.id = m.receiver_id
      WHERE u.id != $1
      GROUP BY u.id
    `;
    const result = await pool.query(q, [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:userId', auth, async (req, res) => {
  try {
    const q = `
      SELECT * FROM messages 
      WHERE (sender_id = $1 AND receiver_id = $2) 
         OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at ASC
    `;
    const result = await pool.query(q, [req.user.id, req.params.userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
