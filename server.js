const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');

connectDB();
app.use(express.json());
app.use('/api/user', require('./routes/api/user'));

app.listen(5000, console.log('server running'));
