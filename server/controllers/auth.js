const axios = require('axios');
const User = require('../model/User');
const Member = require('../model/Member');

module.exports = {
  googleLogin: async (req, res) => {
    const authenticationURI = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${process.env.GOOGLE_OAUTH_CALLBACK_URL}&state=${req.state}&code_challenge=${req.code_challenge}&code_challenge_method=S256&access_type=offline`;
    // add nonce parameter

    return res.status(200).json(authenticationURI);
  },
  googleUser: async (req, res) => {
    const { access_token, refresh_token } = req.session;

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
        //const user = await User.findOne({ google_id });
        const user = await User.findOne({ email });
        if (!user) {
          new User({
            email,
            google_id,
            refreshToken: refresh_token,
          })
            .save()
            .then(async (newUser) => {
              const member = await Member.findOne({ userId: newUser._id });
              if (!member) {
                const newMember = new Member({
                  userId: newUser._id,
                  name,
                  email,
                });

                if (!newMember)
                  return res.status(400).json('Unable to save member');
                await newMember.save();
                return res.status(200).json({ newMember });
              }

              console.log('return member');
              return res.status(200).json({ member });
            });
        }

        const member = await Member.findOne({ userId: user._id });
        if (!member) return res.status(404).json('Cannot find member');

        // TODO: store user obj id in session
        // req.session.userId = user._id
        console.log('return name');
        return res.cookie('authToken', '13259230593u4063u4694035320i469', {
          httpOnly: true,
        });
        // return res.status(200).json('helo');
      })
      .catch((error) => {
        // redirect to certain page if failed
        console.log('cannot login');
      });
  },
};
