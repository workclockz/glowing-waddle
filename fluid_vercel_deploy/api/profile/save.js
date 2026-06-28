const { loadDB, saveDB } = require('../_db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { key, data } = req.body;
  if (!key || !data) return res.status(400).json({ error: 'Invalid' });
  const db = await loadDB();
  db.keys[key] = { ...(db.keys[key] || {}), ...data };
  await saveDB(db);
  res.json({ ok: true });
};
