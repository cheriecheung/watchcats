const User = require('../model/User');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode')
const { createAccessToken, createRefreshToken } = require('../helpers/token');

module.exports = {
  getGoogleAuthenticatorQrCode: async (req, res) => {
    try {
      const secret = speakeasy.generateSecret({ name: 'WatchCats' })
      const { ascii, otpauth_url } = secret;
      req.session.ascii_secret = ascii

      const qrcodeImage = await qrcode.toDataURL(otpauth_url)
      return res.status(200).json(qrcodeImage)
    } catch (err) {
      console.log({ err })
      return res.status(400).json('Error')
    }
  },

  activateTwoFactorAuthentication: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('User id missing');

    const { code } = req.body
    const { ascii_secret } = req.session;
    console.log({ ascii_secret, code })

    try {
      const verified = await speakeasy.totp.verify({
        secret: ascii_secret,
        encoding: 'ascii',
        token: code
      })
      if (!verified) return res.status(401).json('verification failed')

      const updated = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { twoFactorAuthSecret: ascii_secret } },  // hash secret ??
        { useFindAndModify: false }
      );
      if (!updated) return res.status(401).json('unable to enable 2fa')

      return res.status(200).json('verification successful')
    } catch (err) {
      console.log({ err })
      return res.status(401).json('verification failed')
    }
  },

  phoneLogin: async (req, res) => {
    const { code } = req.body;
    const { email } = req.session;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json("Fail to process with 2fa");

      const verified = await speakeasy.totp.verify({
        secret: user.twoFactorAuthSecret,
        encoding: 'ascii',
        token: code
      })
      if (!verified) return res.status(401).json('verification failed')

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
      return res.status(401).json("2fa failed")
    }
  }
}