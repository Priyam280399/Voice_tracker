const express = require('express');
const router = express.Router();
const controller = require('../controllers/parseController');
// POST { text: '...' }
router.post('/', controller.parseText);
module.exports = router;
