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
const Conversation = require('./model/Conversation');

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
app.use('/', authRoute);
app.use('/', userRoute);

// app.get('/', async (req, res) => {
//   // res.send('Hello World');

//   const conversation = await Conversation.find({ participants: { $all: ['001', '002'] } });

//   if (conversation.length === 0) {
//     console.log('creating new conversation record');
//     const newConversation = new Conversation({
//       participants: ['001', '002'],
//     });

//     await newConversation.save();
//     return res.status(201).json('New conversation created');
//   }

//   console.log('>>>>>>> hello');
// });

// app.get('/findConvo', async (req, res) => {
//   // const conversation = await Conversation.find({ participants: { $in: ['001', '003'] } });
//   const conversation = await Conversation.find({ participants: { $all: ['001', '002'] } });

//   console.log({ conversation });
// });

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
