const axios = require('axios');
const User = require('../model/User');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode')
const bcrypt = require('bcryptjs');
const { loginValidation } = require('../helpers/validation');
const { createAccessToken, createRefreshToken, signAccessTokenLogin, signAccessToken } = require('../helpers/token');
// const { google } = require('googleapis');
// const { OAuth2Client } = require('google-auth-library');

const { JWT_SECRET, GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_CALLBACK_URL } = process.env;
let ascii_secret;

// function getOAuthClient() {
//   return new google.auth.OAuth2(GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_CALLBACK_URL);
// }

// const client = new OAuth2Client(GOOGLE_OAUTH_CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_OAUTH_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  // const userid = payload['sub'];

  return payload
}

module.exports = {
  login: async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid email / password combination' });

      const validPass = await bcrypt.compare(password, user.password)
      if (!validPass) return res.status(400).json({ error: 'Invalid email / password combination' });

      const accessToken = createAccessToken(user);

      // give different secret, last longer, 7 days
      const refreshToken = createRefreshToken(user);

      console.log({ accessToken, refreshToken })

      // refresh token to store in cookie; 
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        // domain
      })
      res.cookie('shortId', user.urlId);

      return res.status(200).json({ id: user.urlId, shortId: user.urlId, accessToken })
    } catch (err) {
      console.log({ err })
      return res.status(400).json('Login unsuccessful')
    }

  },

  activateAccount: async (req, res) => {
    const { sub } = req.verifiedData;

    const user = await User.findById(sub);
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

  // googleLogin: async (req, res) => {
  //   try {
  //     const oauth2Client = getOAuthClient()

  //     const url = oauth2Client.generateAuthUrl({
  //       access_type: 'online',
  //       scope: 'email'
  //     });

  //     return res.status(200).json(url);
  //   } catch (err) {
  //     console.log({ err })
  //     return res.status(400).json('Error');
  //   }
  // },

  // getAccessToken: async (req, res) => {
  //   const oauth2Client = getOAuthClient()
  //   const { code } = req.query;

  //   try {
  //     const { tokens } = await oauth2Client.getToken(code)
  //     // oauth2Client.setCredentials(tokens);
  //     const { id_token } = tokens;

  //     const payload = await verify(id_token).catch(console.error);
  //     const { email } = payload;

  //     console.log({ payload, id_token })

  //     const user = await User.findOne({ email });

  //     if (!user) {
  //       const newUser = new User({ email });
  //       await newUser.save();
  //       return res.status(200).json({ shortId: newUser.urlId });
  //       // return res.redirect(`https://localhost:3000/account/${newUser.urlId}`);
  //     }

  //     // return res.redirect(`https://localhost:3000/account/${user.urlId}`);

  //     return res.status(200).json({ shortId: user.urlId });
  //   } catch (err) {
  //     console.log({ err })
  //     return res.status(400).json('Login error')
  //   }
  // },

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

    let userId;

    try {
      const {
        data: { sub: google_id, name, email },
      } = await axios.get('https://openidconnect.googleapis.com/v1/userinfo', config);

      const user = await User.findOne({ email });

      if (!user) {
        const newUser = new User({ name, email });

        await newUser.save();
        req.session.userId = newUser._id;
        userId = newUser._id;
      }

      userId = user._id;

      // const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        // domain
      })

      return res.status(200).json({ userId, shortId: user.urlId });
    } catch (e) {
      console.log('>>>>>>>>>>>> unsuccessful');
      return res.status(401).json('Incorrect credentials');
    }
  },
};
