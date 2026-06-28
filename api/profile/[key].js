const { loadDB, saveDB } = require('../_db');

module.exports = async (req, res) => {
  const k = req.query.key;
  if (!k) return res.status(400).json({ error: 'Missing key' });
  const db = await loadDB();
  if (req.method === 'GET') {
    const d = db.keys[k];
    if (!d) return res.status(404).json({ error: 'Not found' });
    return res.json({ key: k, data: d });
  }
  if (req.method === 'POST') {
    if (!db.keys[k]) return res.status(404).json({ error: 'Not found' });
    Object.assign(db.keys[k], req.body);
    await saveDB(db);
    return res.json({ ok: true });
  }
  if (req.method === 'DELETE') {
    delete db.keys[k];
    await saveDB(db);
    return res.json({ ok: true });
  }
  res.status(405).json({ error: 'Method not allowed' });
};
