const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('dotenv').config();
require('./config/passport-setup');

mongoose.connect(process.env.DB_CONNECT, () => {
  console.log('connected to db yay');
});

// encrypt cookie
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', authRoute);
app.use('/posts', postRoute);

app.listen(3000, () => console.log('Server up and running'));
