const express = require('express');
const cors = require('cors');
const logRoutes = require('./routes/logs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/logs', logRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});