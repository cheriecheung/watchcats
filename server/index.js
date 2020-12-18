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
const socketio = require('socket.io');
const Conversation = require('./model/Conversation')
const Message = require('./model/Message')
const User = require('./model/User')
const { baseRouter } = require('./routes');
const { verify } = require('jsonwebtoken');
const { decode } = require('js-base64');

const { DB_CONNECT, SESS_NAME, SESS_SECRET, SESS_LIFETIME, PASSPHRASE, PORT, JWT_ACCESS_TOKEN_SECRET } = process.env;

const connect = mongoose
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
const io = socketio(server);

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

io.use((socket, next) => {
  const query = socket.handshake.query
  const token = socket.handshake.query.token

  if (query && token) {
    verify(token, JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
      console.log({ socket_token: token, decoded })
      if (err) return next(new Error('Authentication error'));
      // socket.userId = decoded.userId;
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
});

io.on("connection", socket => {
  socket.on("Input Chat Message", async (incomingData) => {

    // connect.then(db => {
    const { message, recipient } = incomingData
    const { decoded } = socket
    const { userId: senderId } = decoded || {}

    try {
      const recipientUserRecord = await User.findOne({ urlId: recipient });
      if (!recipientUserRecord) {
        console.log({ recipientUserRecord })
        console.log('recipient not found..')
        // //   socket.on('disconnect', () => {
        // //     console.log('<<<<<<<<<<< user is now disconnected');
        // return res.status(404).json('ERROR/USER_NOT_FOUND')
      }

      const recipientObjId = mongoose.Types.ObjectId(recipientUserRecord._id);
      const senderObjId = mongoose.Types.ObjectId(senderId)

      const conversation = await Conversation.findOne({
        participant1: [recipientObjId, senderObjId],
        participant2: [recipientObjId, senderObjId],
      });

      if (!conversation) {
        const newConversation = new Conversation({
          lastMessage: message,
          lastMessageDate: Date.now(),
          participant1: recipientObjId,
          participant2: senderObjId,
        });

        const newMessage = new Message({
          sender: senderObjId,
          content: message,
        });

        await newConversation.save((err) => {
          if (err) return err;
          newMessage.conversation = newConversation._id;
          newMessage.save();

          Conversation.findById(newConversation._id)
            .populate("sender")
            .exec((err, doc) => {
              console.log({ new_convo_message_doc: doc })
              return io.emit("Output Chat Message", { ...doc, sender: senderId });
            })
        });

        return;
      }

      conversation.lastMessage = message;
      conversation.lastMessageDate = Date.now()

      await conversation.save();

      const newMessage = new Message({
        sender: senderObjId,
        content: message,
        conversation: conversation._id
      });

      await newMessage.save();

      console.log({ newMessageInExistingConvo: newMessage }
      )

      return io.emit("Output Chat Message", {
        date: Date.now(),
        content: message,
        sender: senderId
      });
    } catch (error) {
      console.error({ error });
      // //   socket.on('disconnect', () => {
      // //     console.log('<<<<<<<<<<< user is now disconnected');
    }
    // })
  })

})

//  =============================
//  =============================

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
