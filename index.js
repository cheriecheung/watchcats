const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

dotenv.config();
mongoose.connect(process.env.DB_CONNECT, () =>
  console.log('connected to db yay')
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server up and running'));
