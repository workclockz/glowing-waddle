const { loadDB, saveDB } = require('../_db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const db = await loadDB();
  const { msgId, key } = req.body;
  const m = db.chat.find(x => x.id === msgId);
  if (!m) return res.status(404).json({ error: 'Message not found' });
  if (!m.hearts) m.hearts = [];
  const idx = m.hearts.indexOf(key);
  if (idx >= 0) m.hearts.splice(idx, 1); else m.hearts.push(key);
  await saveDB(db);
  res.json({ ok: true });
};
