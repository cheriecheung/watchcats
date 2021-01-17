const { registerValidation } = require('../helpers/validation');
const bcrypt = require('bcryptjs');
const Booking = require('../model/Booking');
const Conversation = require('../model/Conversation');
const Message = require('../model/Message');
const User = require('../model/User');
const Review = require('../model/Review');
const { getUnreadBookings } = require('../helpers/bookings');
const { sendActivateAccountMail, sendResetPasswordMail } = require('../helpers/mailer');
const { createActivateAccountToken, createResetPasswordToken } = require('../helpers/token');
const shortid = require('shortid');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
  generateTestAccounts: async (req, res) => {
    try {
      const owner = await Review.findOne({ idd: '1234' })

      owner.content = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores provident placeat quisquam labore. Eveniet possimus, vero provident quaerat nemo aliquid quae repellendus ab, quis, officia culpa doloribus repudiandae sit deserunt odio numquam sunt officiis autem modi? Sunt reiciendis sequi culpa!Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
      
      Asperiores provident placeat quisquam labore. Eveniet possimus, vero provident quaerat nemo aliquid quae repellendus ab, quis, officia culpa doloribus repudiandae sit deserunt odio numquam sunt officiis autem modi? Sunt reiciendis sequi culpa!`
      owner.save();

      // for (let i = 10; i < 15; i++) {
      //   const newUser = new User({
      //     name: `Test #${i}`,
      //     email: `${i}@test.com`,
      //     urlId: shortid.generate(),
      //   });
      //   await newUser.save();
      // }

      return res.status(200).json('You saved the new test accounts')
    }
    catch (err) {
      console.log({ err })
    }
  },

  register: async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json('ERROR/ERROR_OCCURED');

    const { firstName, lastName, email: emailValue, password } = req.body;
    const email = emailValue.toLowerCase()

    console.log({ email, password })

    try {
      const emailExists = await User.findOne({ email });
      if (emailExists) return res.status(400).json('ERROR/EMAIL_ALREADY_EXISTS');

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ firstName, lastName, email, password: hashedPassword });
      await newUser.save();

      const token = createActivateAccountToken(newUser.id);
      sendActivateAccountMail({ email, name: firstName, token })

      return res.status(201).json('success');
    } catch (error) {
      console.log({ error });
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  },

  getActivationEmail: async (req, res) => {
    const { email: emailValue } = req.body;
    const email = emailValue.toLowerCase()

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json('ERROR/ERROR_OCCURED');
      if (user.isVerified) return res.status(200).json('ERROR/ACCOUNT_ALREADY_ACTIVATED');

      const { id, email: userEmail } = user;

      const token = createActivateAccountToken(id);
      sendActivateAccountMail(userEmail, token)

      return res.status(200).json('success');
    } catch (err) {
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  },

  getPasswordResetEmail: async (req, res) => {
    const { email: emailValue } = req.body;
    const email = emailValue.toLowerCase();

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json('ERROR/ERROR_OCCURED');

      const name = user.firstName;
      const token = createResetPasswordToken(user.id);
      sendResetPasswordMail({ email, name, token });

      console.log({ email, name, token })

      return res.status(200).json('Email requested');
    } catch (err) {
      console.log({ err___get_password_reset_email: err })
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  },

  getNotifications: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json('ERROR/ERROR_OCCURED');

      const { owner, sitter } = user;

      const notifications = {
        hasUnreadBookings: false,
        unreadBookingsAsOwner: {},
        unreadBookingsAsSitter: {},
        hasUnreadChats: false
      }

      const { hasUnreadBookings, unreadBookingsAsOwner, unreadBookingsAsSitter } = await getUnreadBookings(owner, sitter);

      if (hasUnreadBookings) {
        notifications.hasUnreadBookings = true;
        notifications.unreadBookingsAsOwner = unreadBookingsAsOwner;
        notifications.unreadBookingsAsSitter = unreadBookingsAsSitter;
      }

      const allChats = await Conversation.find({
        $or: [
          { participant1: userId },
          { participant2: userId }
        ]
      },
        {
          participant1: 1,
          participant2: 1
        }
      )

      const contactUserIds = allChats.map(({ participant1, participant2 }) =>
        participant1.equals(ObjectId(userId)) ? participant2 : participant1
      )

      const chatsIds = allChats.map(({ _id }) => _id)

      const unreadChats = await Message.find({
        conversation: { $in: chatsIds },
        sender: { $in: contactUserIds },
        isReadByRecipient: false
      })
        .select('_id')
        .populate([
          {
            path: 'conversation',
            select: ['_id']
          }
        ])

      if (unreadChats.length > 0) {
        notifications.hasUnreadChats = true;
        notifications.unreadChats = unreadChats.map(({ conversation: { _id } }) => _id)
      }

      return res.status(200).json(notifications);
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  }
};