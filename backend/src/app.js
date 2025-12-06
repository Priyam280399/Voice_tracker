require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const tasksRoutes = require('./routes/tasks');
const parseRoutes = require('./routes/parse');
const parseAudioRoutes = require('./routes/parseAudio');
const app = express();
connectDB();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/tasks', tasksRoutes);
app.use('/api/parse', parseRoutes); // text parse
app.use('/api/parse', parseAudioRoutes); // audio parse (/audio)
app.get('/', (req, res) => res.json({ ok: true, message: 'Voice Task Tracker API' }));
module.exports = app;
