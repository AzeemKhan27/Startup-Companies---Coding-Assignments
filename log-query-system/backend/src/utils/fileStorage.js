const fs = require('fs').promises;
const path = require('path');
const LOGS_FILE = path.join(__dirname, '../../logs.json');

async function readLogs() {
  try {
    const data = await fs.readFile(LOGS_FILE, 'utf8');
    return JSON.parse(data) || [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(LOGS_FILE, '[]');
      return [];
    }
    throw error;
  }
}

async function writeLog(log) {
  const logs = await readLogs();
  logs.push(log);
  await fs.writeFile(LOGS_FILE, JSON.stringify(logs, null, 2));
}

module.exports = { readLogs, writeLog };