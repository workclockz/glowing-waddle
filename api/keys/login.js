const { loadDB, saveDB } = require('../_db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const db = await loadDB();
  const k = req.body.key;
  if (!k || !db.keys[k]) return res.status(404).json({ error: 'Key not found' });
  db.keys[k].lastLogin = Date.now();
  db.keys[k].used = true;
  await saveDB(db);
  res.json({ key: k, data: db.keys[k] });
};
