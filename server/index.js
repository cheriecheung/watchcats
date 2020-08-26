const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
// const passport = require('passport');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const fs = require('fs');
const https = require('https');
const {
  DB_CONNECT,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  PASSPHRASE,
} = process.env;

mongoose.connect(
  DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('connected to db yay');
  }
);

app.use(
  cors({
    origin: 'https://localhost:3000',
    credentials: true,
  })
);
// app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser('secretcode'));

app.use(
  session({
    name: SESS_NAME,
    resave: true,
    saveUninitialized: true,
    secret: SESS_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'session',
      ttl: (24 * 60 * 60) / 1000,
    }),

    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60,
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
  res.send('Hello World');
});

const httpsOptions = {
  key: fs.readFileSync('./server/certificate/localhost.key'),
  cert: fs.readFileSync('./server/certificate/localhost.crt'),
  passphrase: PASSPHRASE,
};

https.createServer(httpsOptions, app).listen(5000, () => {
  console.log('SERVER RUNNING AT ' + 5000);
});
