const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const User = require('./model/User');
require('dotenv').config();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('connected to db yay');
  }
);

// Middleware
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser('secretcode'));
// app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passportConfig')(passport);

// Routes
app.use('/auth', authRoute);
app.use('/user', userRoute);

// app.get('/user', (req, res) => {
//   res.send(req.user);
// });

//Start Server
app.listen(5000, () => console.log('Server up and running'));
