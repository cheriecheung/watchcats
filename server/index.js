const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
require('dotenv').config();
const fs = require('fs');
const https = require('https');

const { baseRouter } = require('./routes');

const socketio = require('socket.io');

const { DB_CONNECT, SESS_NAME, SESS_SECRET, SESS_LIFETIME, PASSPHRASE } = process.env;

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

app.use('/', baseRouter);

const httpsOptions = {
  key: fs.readFileSync('./server/certificate/localhost.key'),
  cert: fs.readFileSync('./server/certificate/localhost.crt'),
  passphrase: PASSPHRASE,
};

const server = https.createServer(httpsOptions, app).listen(5000, () => {
  console.log('SERVER RUNNING AT ' + 5000);
});

const io = socketio(server);

io.on('connection', (socket) => {
  console.log('>>>>>>>>>>> we have a new connection');

  socket.on('send', ({ message }) => {
    console.log({ message });
  });

  socket.on('disconnect', () => {
    console.log('<<<<<<<<<<< user is now disconnected');
  });
});
