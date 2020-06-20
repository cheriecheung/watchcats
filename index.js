const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();
mongoose.connect(process.env.DB_CONNECT, () =>
  console.log('connected to db yay')
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
// app.all('/', (req, res) => {
//   return res.status(200).json({ body: req.body, query: req.query });
// });

app.listen(3000, () => console.log('Server up and running'));
