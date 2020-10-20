const axios = require('axios');
const User = require('../model/User');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode')

let ascii_secret;

module.exports = {
  getGoogleAuthenticatorQrCode: async (req, res) => {
    const secret = speakeasy.generateSecret({ name: 'WatchCats' })
    const { ascii, otpauth_url } = secret;
    ascii_secret = ascii

    try {
      const qrcodeImage = await qrcode.toDataURL(otpauth_url)
      console.log({ qrcodeImage })
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

      const user = await User.findOne({ email });
      if (!user) {
        const newUser = new User({ name, email });

        await newUser.save();
        req.session.userId = newUser._id;
        return res.status(200).json({ userId: newUser._id, shortId: newUser.urlId });
      }

      req.session.userId = user._id;
      return res.status(200).json({ userId: user._id, shortId: user.urlId });
    } catch (e) {
      console.log('>>>>>>>>>>>> cannot unsuccessful', e);
      return res.status(401).json('Incorrect credentials');
    }
  },
};
