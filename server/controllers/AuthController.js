const axios = require('axios');
const User = require('../model/User');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode')
const bcrypt = require('bcryptjs');
const { loginValidation } = require('../helpers/validation');
const { createAccessToken, createRefreshToken } = require('../helpers/token');

let ascii_secret;

module.exports = {
  login: async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      // dev purpose: error remains "no user found"
      // for production: error as Invalid email / password combination
      if (!user) return res.status(400).json({ error: 'No user found' });

      const validPass = await bcrypt.compare(password, user.password)
      if (!validPass) return res.status(400).json({ error: 'Invalid email / password combination' });

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
      return res.status(400).json('Login unsuccessful')
    }
  },

  logout: async (req, res) => {
    const { userId } = req.verifiedData;

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json('User not found');

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

  getGoogleAuthenticatorQrCode: async (req, res) => {
    const secret = speakeasy.generateSecret({ name: 'WatchCats' })
    const { ascii, otpauth_url } = secret;
    ascii_secret = ascii

    console.log({ ascii_secret_code: ascii_secret })

    try {
      const qrcodeImage = await qrcode.toDataURL(otpauth_url)
      return res.status(200).json(qrcodeImage)
    } catch (err) {
      console.log({ err })
      return res.status(400).json('Error')
    }
  },

  verifyGoogleAuthenticatorCode: async (req, res) => {
    const { code } = req.body
    console.log({ ascii_secret, code })

    try {
      const verified = await speakeasy.totp.verify({
        secret: ascii_secret,
        encoding: 'ascii',
        token: code
      })
      console.log({ verified })

      // hash secret, save to user

      return res.status(200).json('verification successful')
    } catch (err) {
      console.log({ err })
      return res.status(200).json('verification failed')
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
};
