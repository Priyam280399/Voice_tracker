const nlp = require('../utils/nlp');
exports.parseText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });
    const parsed = nlp.parse(text);
    res.json({ transcript: text, parsed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Parsing failed' });
  }
};
