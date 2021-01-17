const axios = require('axios');
const qs = require('querystring');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { loginValidation } = require('../helpers/validation');
const { createAccessToken, createRefreshToken } = require('../helpers/token');
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

module.exports = {
  getNewAccessToken: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('ERROR/ERROR_OCCURED');

    try {
      const user = await User.findById(userId)
      if (!user) return res.status(404).json('ERROR/USER_NOT_FOUND');

      const { firstName } = user;
      const accessToken = createAccessToken(user)

      return res.status(200).json({ accessToken, name: firstName })
    } catch (err) {
      console.log({ err })
      return res.status(402).json('ERROR/ERROR_OCCURED')
    }
  },

  login: async (req, res) => {
    const { email, password, asDemoUser } = req.body;

    const { DEMO_USER_EMAIL, DEMO_USER_PASSWORD } = process.env;

    const credentials = {};

    if (asDemoUser) {
      credentials.email = DEMO_USER_EMAIL;
      credentials.password = DEMO_USER_PASSWORD;
    } else {
      const { error } = loginValidation({ email, password });
      if (error) return res.status(400).json('ERROR/LOGIN_FAILED');

      credentials.email = email.toLowerCase();
      credentials.password = password;
    }

    try {
      const user = await User.findOne({ email: credentials.email });
      if (!user) return res.status(400).json("ERROR/LOGIN_FAILED");

      if (!user.isVerified) return res.status(400).json("ERROR/LOGIN_FAILED")

      const validPass = await bcrypt.compare(credentials.password, user.password)
      if (!validPass) return res.status(400).json("ERROR/LOGIN_CREDENTIALS_INVALID");

      if (user.twoFactorSecret && !asDemoUser) {
        return res.status(200).json({ urlId: user.urlId })
      }

      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);

      return res.status(200).json({ accessToken, refreshToken, urlId: user.urlId })
    } catch (err) {
      console.log({ err })
      return res.status(400).json("ERROR/ERROR_OCCURED")
    }
  },

  logout: async (req, res) => {
    const { userId } = req.verifiedData;

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json('ERROR/USER_NOT_FOUND');

      return res.status(204).json('')
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  },

  activateAccount: async (req, res) => {
    const { userId } = req.verifiedData;

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json('ERROR/USER_NOT_FOUND');
      if (user.isVerified) return res.status(200).json('ERROR/ACCOUNT_ALREADY_ACTIVATED');

      user.isVerified = true;
      await user.save();

      return res.status(200).json('Account activate is now activated');
    } catch (err) {
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  },

  getGoogleLoginURL: async (req, res) => {
    const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CALLBACK_URL } = process.env
    const { code_challenge, code_verifier, csrf_token } = req;

    myCache.set("code_verifier", code_verifier)
    myCache.set("csrf_token", csrf_token)

    const authenticationURI = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_OAUTH_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${GOOGLE_OAUTH_CALLBACK_URL}&state=${csrf_token}&code_challenge=${code_challenge}&code_challenge_method=S256&access_type=offline`;
    // add nonce parameter

    return res.status(200).json(authenticationURI);
  },

  authenticateGoogleUser: async (req, res) => {
    const { code, state: stateValue } = req.query;

    if (!code || !stateValue) {
      return res.redirect(`${process.env.CLIENT_URL}/google-login/failcallback`);
    }

    const state = stateValue.split(' ').join('+');

    const code_verifier = myCache.take("code_verifier")
    const csrf_token = myCache.take("csrf_token")

    if (state !== csrf_token) {
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }

    const requestBody = {
      code,
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_OAUTH_CALLBACK_URL,
      code_verifier,
      grant_type: 'authorization_code',
    };

    try {
      const { data } = await axios.post(
        'https://oauth2.googleapis.com/token',
        qs.stringify(requestBody),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token, refresh_token } = data || {};

      if (!access_token && !refresh_token) {
        return res.redirect(`${process.env.CLIENT_URL}/google-login/failcallback`);
      }

      myCache.set("access_token", access_token)

      return res.redirect(`${process.env.CLIENT_URL}/google-login/callback`);
    } catch (err) {
      console.log({ err })
      return res.redirect(`${process.env.CLIENT_URL}/google-login/failcallback`);
    }
  },

  getGoogleUser: async (req, res) => {
    const googleAccessToken = myCache.take("access_token")

    console.log({ googleAccessToken })

    if (!googleAccessToken) {
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }

    try {
      const { data } = await axios.get(
        'https://openidconnect.googleapis.com/v1/userinfo',
        {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
          },
        }
      );

      const { sub: google_id, email } = data;

      let userObj = {};

      const user = await User.findOne({ email });

      if (user && user.password) {
        console.log('hey error')
        return res.status(400).json('ERROR/ERROR_OCCURED');
      }

      if (user && !user.password) {
        userObj = user;
      }

      if (!user) {
        const newUser = new User({ email });
        await newUser.save();
        userObj = newUser;
      }

      const accessToken = createAccessToken(userObj);
      const refreshToken = createRefreshToken(userObj);

      return res.status(200).json({ accessToken, refreshToken, urlId: userObj.urlId })
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  },

  resetPassword: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('ERROR/PASSOWORD_RESET_FAILED');

    const { currentPassword, newPassword } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user || !user.password) return res.status(400).json('ERROR/PASSOWORD_RESET_FAILED');

      const validPass = await bcrypt.compare(currentPassword, user.password);
      if (!validPass) return res.status(400).json("ERROR/PASSWORD_INCORRECT");

      const salt = await bcrypt.genSalt(12);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedNewPassword;
      await user.save();

      // joi fulfill password requirement

      // const userRecord = await User.findOneAndUpdate(
      //   { _id: userId },
      //   { $set: { password: hashedNewPassword } },
      //   { useFindAndModify: false }
      // );
      // if (!userRecord) return res.status(400).json('ERROR/PASSOWORD_RESET_FAILED');

      return res.status(200).json('');
    } catch (err) {
      console.log({ err });
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  },

  resetForgotPassword: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('ERROR/ERROR_OCCURED');

    const { newPassword } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(400).json('ERROR/USER_NOT_FAILED');

      const salt = await bcrypt.genSalt(12);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedNewPassword;
      await user.save();

      return res.status(200).json('');
    } catch (err) {
      console.log({ err });
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  }
};
