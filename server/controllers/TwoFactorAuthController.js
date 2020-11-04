const User = require('../model/User');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode')

let ascii_secret;

module.exports = {
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
}