const axios = require('axios');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { loginValidation } = require('../helpers/validation');
const { createAccessToken, createRefreshToken } = require('../helpers/token');
const { verify } = require('jsonwebtoken')

module.exports = {
  getNewAccessToken: async (req, res) => {
    const { refresh_token } = req.cookies;
    if (!refresh_token) return res.status(401).json({ ok: false, message: 'message' });

    try {
      let payload = null;

      payload = verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
      if (!payload) return res.status(402).json({ ok: false, message: 'message' });

      const user = await User.findById(payload.userId)
      if (!user) return res.status(403).json({ ok: false, message: 'message' });

      // To revoke token, change the token version
      // if (user.tokenVersion !== payload.tokenVersion) return res.send({ ok: false, accessToken: '' });

      const accessToken = createAccessToken(user)
      // const refreshToken = createRefreshToken(user)
      // res.cookie('refresh_token', refreshToken, {httpOnly:true})

      return res.status(200).json({ ok: true, accessToken })
    } catch (err) {
      console.log({ err })
      return res.status(402).json('Unable to get access token')
    }
  },

  login: async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      // dev purpose: error remains "no user found"
      // for production: error as Invalid email / password combination
      if (!user) return res.status(400).json("Email and password combination isn't valid");

      const validPass = await bcrypt.compare(password, user.password)
      if (!validPass) return res.status(400).json("Email and password combination isn't valid");

      if (user.twoFactorSecret) {
        req.session.email = email;
        return res.status(200).json('enter google authenticator code')
      }

      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        // domain
      })
      res.cookie('shortId', user.urlId);

      return res.status(200).json({ shortId: user.urlId, accessToken })
    } catch (err) {
      console.log({ err })
      return res.status(400).json("Email and password combination isn't valid")
    }
  },

  logout: async (req, res) => {
    const { userId } = req.verifiedData;

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json('User not found');

      req.session.destroy();
      res.clearCookie("refresh_token", { path: "/" });

      return res.status(204).json('Logging out...');
    } catch (err) {
      console.log({ err })
      return res.status(400).json('Cannot logout');
    }
  },

  activateAccount: async (req, res) => {
    const { userId } = req.verifiedData;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json('User not found');
    if (user.isVerified) return res.status(200).json('Account has previously been activated');

    try {
      user.isVerified = true;
      await user.save();

      return res.status(200).json('Account activate is now activated');
    } catch (err) {
      return res.status(400).json('Unable to update the status of your account');
    }
  },

  googleLogin: async (req, res) => {
    const authenticationURI = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${process.env.GOOGLE_OAUTH_CALLBACK_URL}&state=${req.state}&code_challenge=${req.code_challenge}&code_challenge_method=S256&access_type=offline`;
    // add nonce parameter

    return res.status(200).json(authenticationURI);
  },


  googleUser: async (req, res) => {
    const { access_token, refresh_token } = await req.session;

    // if (!access_token && !refresh_token) {
    //   return res.redirect('https://localhost:3000/');
    // }

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    try {
      const {
        data: { sub: google_id, name, email },
      } = await axios.get('https://openidconnect.googleapis.com/v1/userinfo', config);

      let shortId;
      let userObj;

      const user = await User.findOne({ email });

      if (!user) {
        const newUser = new User({ name, email });
        await newUser.save();

        const { urlId } = newUser;
        shortId = urlId;
        userObj = newUser
      } else {
        const { urlId } = user;
        shortId = urlId;
        userObj = user
      }

      const refreshToken = createRefreshToken(userObj);
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        // domain
      })

      return res.status(200).json({ shortId });
    } catch (e) {
      console.log('>>>>>>>>>>>> unsuccessful', e);
      return res.status(401).json('Incorrect credentials');
    }
  },

  resetPassword: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('No user id');

    const { password } = req.body;
    // hash password

    try {
      const userRecord = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { password: 'hasedPassword' } },
        { useFindAndModify: false }
      );
      if (!userRecord) return res.status(401).json('Fail to update');

      return res.status(200).json('Phone deleted')
    } catch (err) {
      console.log({ err })
      return res.status(403).json('Unable to delete phone')
    }
  }
};
