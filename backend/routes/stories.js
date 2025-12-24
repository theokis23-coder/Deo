const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Créer une story
router.post('/', auth, upload.single('media'), async (req, res) => {
  try {
    const media_url = req.file ? `/uploads/${req.file.filename}` : null;
    
    if (!media_url) {
      return res.status(400).json({ error: 'Media requis' });
    }

    const q = `INSERT INTO stories (user_id, media_url) 
               VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(q, [req.user.id, media_url]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer les stories actives
router.get('/', auth, async (req, res) => {
  try {
    const q = `
      SELECT s.*, u.name, u.avatar_url 
      FROM stories s
      JOIN users u ON s.user_id = u.id
      WHERE s.created_at > NOW() - INTERVAL '24 hours'
      ORDER BY s.created_at DESC
    `;
    const result = await pool.query(q);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
