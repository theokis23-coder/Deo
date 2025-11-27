const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require("../middleware/authMiddleware");

router.get("/me", auth, async (req, res) => {
  try {
    const q = "SELECT id, phone, email, name, bio, avatar_url, is_vip, created_at FROM users WHERE id=$1";
    const r = await pool.query(q, [req.user.id]);
    res.json(r.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
