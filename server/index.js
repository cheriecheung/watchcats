const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
// const passport = require('passport');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const fs = require('fs');
const https = require('https');

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
// app.use(cookieParser('secretcode'));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/passportConfig')(passport);

// Routes
app.use('/auth', authRoute);
app.use('/user', userRoute);

app.get('/', (req, res) => {
  req.session.userName = 'Wiestjeeeeeee';
  res.send('Hello World');
});

app.get('/getUsername', (req, res) => {
  console.log(req.session.userName);
});

const httpsOptions = {
  key: fs.readFileSync('./server/certificate/localhost.key'),
  cert: fs.readFileSync('./server/certificate/localhost.crt'),
  passphrase: process.env.PASSPHRASE,
};

https.createServer(httpsOptions, app).listen(5000, () => {
  console.log('SERVER RUNNING AT ' + 5000);
});
