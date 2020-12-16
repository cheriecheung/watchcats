const User = require('../model/User');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode')
const { createAccessToken, createRefreshToken } = require('../helpers/token');
const { encryptSecret, decryptSecret } = require('../helpers/authentication')
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

module.exports = {
  getGoogleAuthenticatorQrCode: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('ERROR/USER_NOT_FOUND');

    const user = await User.findById(userId);
    if (!user) return res.status(401).json('ERROR/USER_NOT_FOUND')

    try {
      const name = `WatchCats (${user.email})`

      const secret = speakeasy.generateSecret({ name })
      const { ascii, otpauth_url } = secret;
      myCache.set("ascii_secret", ascii)

      const qrcodeImage = await qrcode.toDataURL(otpauth_url)
      return res.status(200).json(qrcodeImage)
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/ERROR_OCCURED')
    }
  },

  activateTwoFactorAuthentication: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(400).json('ERROR/2FA_ACTIVATION_FAILED');

    const { code } = req.body
    const ascii_secret = myCache.take("ascii_secret")

    console.log({ ascii_secret, code })

    try {
      const verified = await speakeasy.totp.verify({
        secret: ascii_secret,
        encoding: 'ascii',
        token: code
      })
      if (!verified) return res.status(400).json('ERROR/GOOGLE_OTP_INVALID')

      const user = await User.findById(userId);
      if (!user) return res.status(404).json('ERROR/2FA_ACTIVATION_FAILED')

      const encrypted = encryptSecret(ascii_secret)

      user.twoFactorSecret = encrypted;
      await user.save();

      return res.status(200).json('')
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/2FA_ACTIVATION_FAILED')
    }
  },

  disableTwoFactor: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    const { code } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json("ERROR/USER_NOT_FOUND");

      const decrypted = decryptSecret(user.twoFactorSecret)

      const verified = await speakeasy.totp.verify({
        secret: decrypted,
        encoding: 'ascii',
        token: code
      })
      if (!verified) return res.status(400).json('ERROR/OTP_INVALID')

      await User.findOneAndUpdate(
        { _id: userId },
        { $unset: { twoFactorSecret: '' } },
        { useFindAndModify: false }
      );

      return res.status(200).json('verification successful')
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/ERROR_OCCURED')
    }
  },

  phoneLogin: async (req, res) => {
    const { code, shortId } = req.body;

    try {
      const user = await User.findOne({ urlId: shortId });
      if (!user) return res.status(401).json("ERROR/ERROR_OCCURED");

      const decrypted = decryptSecret(user.twoFactorSecret)

      // make sure this runs only after decryptSecret() ?
      const verified = await speakeasy.totp.verify({
        secret: decrypted,
        encoding: 'ascii',
        token: code
      })
      if (!verified) return res.status(401).json('ERROR/OTP_INVALID')

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
      return res.status(401).json("ERROR/ERROR_OCCURED")
    }
  }
}