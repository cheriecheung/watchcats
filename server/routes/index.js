const express = require('express');
const baseRouter = express.Router();
const Conversation = require('../model/Conversation');

baseRouter.get('/', async (req, res) => {
  //   return res.json('hello world~');
  // test conversation schema
  // const conversation = await Conversation.find({ participants: { $all: ['001', '002'] } });
  // if (conversation.length === 0) {
  //   console.log('creating new conversation record');
  //   const newConversation = new Conversation({
  //     participants: ['001', '002'],
  //   });
  //   await newConversation.save();
  //   return res.status(201).json('New conversation created');
  // }
  // console.log('>>>>>>> you have an existing conversation');
});

baseRouter.get('/findConvo', async (req, res) => {
  // const conversation = await Conversation.find({ participants: { $in: ['001', '003'] } });
  const conversation = await Conversation.find({ participants: { $all: ['001', '002'] } });

  console.log({ conversation });
});

baseRouter.use('/', require('./auth'));
baseRouter.use('/', require('./user'));
baseRouter.use('/', require('./cat_sitter'));
baseRouter.use('/', require('./cat_owner'));
baseRouter.use('/', require('./chat'));

module.exports = { baseRouter };
