require('dotenv').config();
const express = require('express');
const app = express();
// const https = require('https');
const http = require('http');
const fs = require('fs')
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const compression = require('compression');

const socketio = require('socket.io');
const Conversation = require('./model/Conversation')
const Message = require('./model/Message')
const User = require('./model/User')
const { baseRouter } = require('./routes');
const { verify } = require('jsonwebtoken');
const { populateChatList } = require('./helpers/chat')
const { sendNewMessageMail } = require('./helpers/mailer')
const { sendTwilioSMS } = require('./helpers/sms')

const { DB_CONNECT, PORT, JWT_ACCESS_TOKEN_SECRET, CLIENT_URL } = process.env;

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
const server = http.createServer({}, app).listen(port, () => {
  console.log('SERVER RUNNING AT ' + port);
});

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(compression({
  level: 6,
  threshold: 100 * 1000,
  filter: (req, res) => {
    if (req.header['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res)
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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

const io = socketio(server);

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
    const { message, recipient } = incomingData
    const { decoded } = socket
    const { userId: senderId } = decoded || {}

    try {
      const recipientUserRecord = await User.findOne({ urlId: recipient });
      if (!recipientUserRecord) {
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

      if (conversation) {
        const newMessage = new Message({
          sender: senderObjId,
          content: message,
          conversation: conversation._id
        });
        await newMessage.save();

        conversation.lastMessage = newMessage._id;
        conversation.updatedAt = Date.now()
        await conversation.save();
      } else {
        const newMessage = new Message({
          sender: senderObjId,
          content: message,
        });

        await newMessage.save();

        const newConversation = new Conversation({
          lastMessage: newMessage._id,
          participant1: recipientObjId,
          participant2: senderObjId,
          updatedAt: Date.now()
        });

        await newConversation.save();

        newMessage.conversation = newConversation._id;
        await newMessage.save();
      }

      const { populatedList } = await populateChatList(senderId);
      if (!populatedList) return res.status(404).json('ERROR/ERROR_OCCURED')

      const {
        firstName,
        lastName,
        email,
        getEmailNotification,
        phone,
        getSmsNotification
      } = recipientUserRecord

      const recipientName = `${firstName} ${lastName.charAt(0)}`
      if (email && getEmailNotification) {
        sendNewMessageMail({ email, name: recipientName })
      }

      if (phone && getSmsNotification) {
        sendTwilioSMS(phone, 'MESSAGE_RECEIVED', { name: recipientName })
      }

      // 2. update notification badge in app

      return io.emit("Output Chat Message", {
        newMessage: {
          date: Date.now(),
          content: message,
          sender: senderId
        },
        updatedChatList: populatedList
      });
    } catch (error) {
      console.error({ error });
      // //   socket.on('disconnect', () => {
      // //     console.log('<<<<<<<<<<< user is now disconnected');
    }
  })
})