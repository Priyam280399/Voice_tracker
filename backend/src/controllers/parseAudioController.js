const axios = require('axios');
const fs = require('fs');
const multer = require('multer');
const nlp = require('../utils/nlp');
const { log } = require('console');
const upload = multer({ dest: 'uploads/' });
async function uploadToAssemblyAI(filePath, apiKey) {
  const stream = fs.createReadStream(filePath);
  const res = await axios({
    method: 'post',
    url: 'https://api.assemblyai.com/v2/upload',
    headers: { 'authorization': apiKey, 'transfer-encoding': 'chunked' },
    data: stream
  });
  console.log(res.data.upload_url, "--->");
  
  return res.data.upload_url;
}
async function createTranscript(uploadUrl, apiKey) {
  const res = await axios.post('https://api.assemblyai.com/v2/transcript', { audio_url: uploadUrl }, { headers: { 'authorization': apiKey } });
  return res.data.id;
}
async function pollTranscript(transcriptId, apiKey, interval = 2500, timeout = 120000) {
  const url = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;
  const start = Date.now();
  while (true) {
    const res = await axios.get(url, { headers: { 'authorization': apiKey } });
    const status = res.data.status;
    if (status === 'completed') return res.data.text;
    if (status === 'error') throw new Error('Transcription failed: ' + (res.data.error || 'unknown'));
    if (Date.now() - start > timeout) throw new Error('Transcription timeout');
    await new Promise(r => setTimeout(r, interval));
  }
}
exports.handleAudio = [
  upload.single('audio'),
  async (req, res) => {
    
    const apiKey = process.env.ASSEMBLYAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'ASSEMBLYAI_API_KEY not set' });
    if (!req.file) return res.status(400).json({ error: 'No audio file uploaded' });
    const filePath = req.file.path;
    console.log(filePath, "-->");
    try {
      const uploadUrl = await uploadToAssemblyAI(filePath, apiKey);
      const transcriptId = await createTranscript(uploadUrl, apiKey);
      const text = await pollTranscript(transcriptId, apiKey);
      const parsed = nlp.parse(text);
      res.json({ transcript: text, parsed });
    } catch (err) {
      console.error('Audio parse error', err?.message || err);
      res.status(500).json({ error: 'Failed to transcribe audio', details: err.message });
    } finally {
      fs.unlink(filePath, () => {});
    }
  }
];
