const express = require('express');
const { readLogs, writeLog } = require('../utils/fileStorage');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const log = req.body;
    if (!log.level || !log.message || !log.timestamp) {
      return res.status(400).json({ error: 'Missing required fields: level, message, timestamp' });
    }
    const validLevels = ['error', 'warning', 'info'];
    if (!validLevels.includes(log.level)) {
      return res.status(400).json({ error: 'Invalid log level' });
    }
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(log.timestamp)) {
      return res.status(400).json({ error: 'Invalid timestamp format' });
    }
    const newLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date(log.timestamp).toISOString(),
    };
    console.log("newLog = > ", newLog);

    await writeLog(newLog);
    res.status(201).json(newLog);
  } catch (error) {
    console.error('Error saving log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { level, message, resourceId, timestamp_start, timestamp_end, traceId, spanId, commit } = req.query;
    let logs = await readLogs();
    
    if (level) logs = logs.filter(log => log.level === level);
    if (message) logs = logs.filter(log => log.message.toLowerCase().includes(message.toLowerCase()));
    if (resourceId) logs = logs.filter(log => log.resourceId === resourceId);
    if (timestamp_start) logs = logs.filter(log => new Date(log.timestamp) >= new Date(timestamp_start));
    if (timestamp_end) logs = logs.filter(log => new Date(log.timestamp) <= new Date(timestamp_end));
    if (traceId) logs = logs.filter(log => log.traceId === traceId);
    if (spanId) logs = logs.filter(log => log.spanId === spanId);
    if (commit) logs = logs.filter(log => log.commit === commit);

    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error retrieving logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;