const axios = require('axios');
const User = require('../model/User');
const Member = require('../model/Member');
const mongoose = require('mongoose');

module.exports = {
  googleLogin: async (req, res) => {
    const authenticationURI = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${process.env.GOOGLE_OAUTH_CALLBACK_URL}&state=${req.state}&code_challenge=${req.code_challenge}&code_challenge_method=S256&access_type=offline`;
    // add nonce parameter

    return res.status(200).json(authenticationURI);
  },
  googleUser: async (req, res) => {
    console.log({ googleUserrrrrrrrrrrr: req.session });
    const { access_token, refresh_token } = await req.session;

    // if (!access_token && !refresh_token) {
    //   return res.redirect('https://localhost:3000/');
    // }

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    await axios
      .get('https://openidconnect.googleapis.com/v1/userinfo', config)
      .then(async ({ data: { sub: google_id, email, name } }) => {
        const user = await User.findOne({ email });

        if (!user) {
          const newMember = new Member({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
          });

          newMember.save((err) => {
            if (err) return err;

            const newUser = new User({
              member: newMember._id,
              email,
              refreshToken: refresh_token,
            });

            newUser.save((err) => {
              if (err) return err;
              req.session.userId = newUser._id;
              return res.status(201).json({ newMember, newUser });
            });
          });
        }

        if (user) {
          req.session.userId = user._id;
          return res
            .status(200)
            .json({ sid: req.session.id, user: { name, email } });
          // .json({ sid: req.session.id })
        }
      })
      .catch((error) => {
        // redirect to certain page if failed
        console.log('cannot login');
        return res.status(401).json('Incorrect credentials');
      });
  },
};
