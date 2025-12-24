const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware');

// Récupérer les notifications
router.get('/', auth, async (req, res) => {
  try {
    const q = `
      SELECT * FROM notifications 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT 50
    `;
    const result = await pool.query(q, [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Marquer comme lu
router.put('/:id/read', auth, async (req, res) => {
  try {
    const q = `UPDATE notifications SET is_read = true 
               WHERE id = $1 AND user_id = $2 RETURNING *`;
    const result = await pool.query(q, [req.params.id, req.user.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification non trouvée' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
