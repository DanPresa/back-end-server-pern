const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3600;

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/todos', require('./routes/todos'));

app.listen(PORT, () => {
    console.log(`Express Server is running on port: ${ PORT }`)
});