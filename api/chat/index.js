const { loadDB, saveDB } = require('../_db');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const db = await loadDB();
    return res.json(db.chat.slice(-200));
  }
  if (req.method === 'POST') {
    const db = await loadDB();
    const entry = req.body;
    if (!entry.id) entry.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    db.chat.push(entry);
    if (db.chat.length > 200) db.chat = db.chat.slice(-200);
    await saveDB(db);
    return res.json({ ok: true });
  }
  res.status(405).json({ error: 'Method not allowed' });
};
