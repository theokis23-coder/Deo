const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const moderation = require('../middleware/moderation');


router.post('/', auth, upload.single('image'), moderation, async (req, res) => {
  try {
    const content = req.body.content || null;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const q = `INSERT INTO posts(user_id, content, image_url)
               VALUES($1,$2,$3)
               RETURNING *`;

    const r = await pool.query(q, [req.user.id, content, image_url]);
    res.json(r.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const q = `SELECT p.*, u.name, u.avatar_url
               FROM posts p
               JOIN users u ON u.id = p.user_id
               ORDER BY p.created_at DESC
               LIMIT 100`;

    const r = await pool.query(q);
    res.json(r.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


router.post('/report-user', auth, async (req, res) => {
  try {
    const { reportedUserId, reason } = req.body;
    
    if (!reportedUserId || !reason) {
      return res.status(400).json({ error: "ID utilisateur et raison requis" });
    }

    const q = "INSERT INTO user_reports (reporter_id, reported_user_id, reason) VALUES ($1, $2, $3) RETURNING *";
    const result = await pool.query(q, [req.user.id, reportedUserId, reason]);
    
    res.json({ message: "Utilisateur signalé avec succès", report: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
