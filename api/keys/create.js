const { loadDB, saveDB } = require('../_db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const db = await loadDB();
  const seg = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  let k; do { k = seg() + '-' + seg() + '-' + seg(); } while (db.keys[k]);
  const bal = Math.max(0, Number(req.body.balance) || 100);
  const label = req.body.label || '';
  db.keys[k] = {
    balance: bal, created: Date.now(), rewards: {}, gamesPlayed: 0,
    totalWagered: 0, totalWon: 0, bestWin: 0, highScore: bal,
    xp: 0, level: 1, lastBonus: null, history: [], seenIntro: false,
    username: label || 'Player', label, used: false, lastLogin: null
  };
  await saveDB(db);
  res.json({ key: k });
};
