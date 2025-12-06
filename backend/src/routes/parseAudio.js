const express = require('express');
const router = express.Router();
const parseAudioController = require('../controllers/parseAudioController');
// POST multipart/form-data with 'audio' field
router.post('/audio', parseAudioController.handleAudio);
module.exports = router;
