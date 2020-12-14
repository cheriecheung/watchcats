require('dotenv').config();
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs')
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const { baseRouter } = require('./routes');

const { DB_CONNECT, SESS_NAME, SESS_SECRET, SESS_LIFETIME, PASSPHRASE, PORT } = process.env;

mongoose
  .connect(DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to db yay'))
  .catch((err) => console.log(err.message));

const key = fs.readFileSync(path.join(__dirname, 'certificate', 'key.pem'))
const cert = fs.readFileSync(path.join(__dirname, 'certificate', 'cert.pem'))
const credentials = { key, cert };

const port = PORT || 5000
const server = https.createServer(credentials, app).listen(port, () => {
  console.log('SERVER RUNNING AT ' + port);
});

app.use(
  cors({
    // https://watchcats.nl
    origin: 'https://localhost:3000',
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.get('/', (req, res) => {
  return res.status(200).send(`${process.env.TEST_VALUE}lalalalal`)
});

app.get('/test-api', (req, res) => {
  return res.status(200).send('your api is working finally omg ');
});

app.get('/test-again', (req, res) => {
  return res.status(200).send('your api is working again!!!!!!!!!!!');
});

// const mongoose = require('mongoose');
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const cookie = require('cookie');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const https = require('https');
// const fs = require('fs');
// const User = require('./model/User');
// const Conversation = require('./model/Conversation');
// const Message = require('./model/Message');
// const { baseRouter } = require('./routes');
// const socketio = require('socket.io');

// const { DB_CONNECT, SESS_NAME, SESS_SECRET, SESS_LIFETIME, PASSPHRASE } = process.env;

// mongoose
//   .connect(DB_CONNECT, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => console.log('connected to db yay'))
//   .catch((err) => console.log(err.message));

// app.use(
//   cors({
//     origin: 'https://localhost:3000',
//     credentials: true,
//   })
// );

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(cookieParser('secretcode'));
// app.use(cookieParser());

// app.use(
//   session({
//     name: SESS_NAME,
//     resave: true,
//     saveUninitialized: true,
//     secret: SESS_SECRET,
//     store: new MongoStore({
//       mongooseConnection: mongoose.connection,
//       collection: 'session',
//       ttl: (24 * 60 * 60) / 1000,
//     }),

//     cookie: {
//       httpOnly: true,
//       secure: true,
//       maxAge: 24 * 60 * 60,
//     },
//   })
// );

// // app.use((req, res, next) => {
// //   res.header("Access-Control-Allow-Headers","*");
// // res.header('Access-Control-Allow-Credentials', true);
// //   res.header('Access-Control-Allow-Origin', 'YOUR-DOMAIN.TLD'); // update to match the domain you will make the request from
// //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// //   next();
// // });

// app.use('/', baseRouter);

// app.get('/', (req, res) => {
//   return res.status(200).json('You did it. You deployed your actual backend app!')
// });


// app.get('/test-api', (req, res) => {
//   return res.status(200).json('testing the first time')
// })

// app.get('/test-again', (req, res) => {
//   return res.status(200).json('testing the SECOND time')
// })

// const port = process.env.port || 5000;

// const httpsOptions = {
//   key: fs.readFileSync('./server/certificate/localhost.key'),
//   cert: fs.readFileSync('./server/certificate/localhost.crt'),
//   passphrase: PASSPHRASE,
// };

// const server = https.createServer(httpsOptions, app).listen(port, () => {
//   console.log('SERVER RUNNING AT ' + port);
// });

// // ------------- CHAT ------------- //

// // const io = socketio(server);

// // const checkHeader = () => {
// //   io.use((socket, next) => {
// //     console.log({ cookie: socket.request.headers.cookie });
// //     if (socket.request.headers.cookie) return next();
// //     next(new Error('Authentication error'));
// //   });
// // };

// // io.use((socket, next) => {
// //   // if (socket.request.headers.cookie) return next();
// //   // next(new Error('Authentication error'));
// //   const userId = socket.handshake.query.userId;

// //   // 1. steps to verify incoming userId
// //   // 2. throw err if wrong userId / no userId

// //   socket.userId = userId;
// //   return next();
// // });

// // io.on('connection', (socket) => {
// //   console.log('>>>>>>>>>>> we have a connection');

// //   socket.on('send', async ({ message, recipient }) => {
// //     console.log({ message, recipient });

// //     const recipientUser = await User.findOne({ urlId: recipient });
// //     const recipientObjId = mongoose.Types.ObjectId(recipientUser._id);

// //     const senderObjId = mongoose.Types.ObjectId(socket.userId);

// //     const currentConversation = await Conversation.findOne({
// //       participant1: [recipientObjId, senderObjId],
// //       participant2: [recipientObjId, senderObjId],
// //     });

// //     if (currentConversation) {
// //       console.log({ currentConversation });
// //       console.log('see, this conversation exists');
// //     }

// //     if (!currentConversation) {
// //       const newConversation = new Conversation({
// //         lastMessage: message,
// //         lastMessageDate: Date.now(),
// //         participant1: recipientObjId,
// //         participant2: senderObjId,
// //       });

// //       // save new message in Message model

// //       const newMessage = new Message({
// //         // displays as plain string, not obj id
// //         sender: senderObjId,
// //         content: message,
// //       });

// //       await newConversation.save((err) => {
// //         if (err) return err;
// //         newMessage.conversation = newConversation._id;
// //         newMessage.save();
// //       });
// //     }
// //   });

// //   socket.on('disconnect', () => {
// //     console.log('<<<<<<<<<<< user is now disconnected');
// //   });
// // });
