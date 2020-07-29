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
    const { accessToken, refreshToken } = req;

    // console.log({ SESSION: req.session });

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    await axios
      .get('https://openidconnect.googleapis.com/v1/userinfo', config)
      .then(async ({ data: { sub: google_id, email, name } }) => {
        console.log({ google_id, email, name });
        //const user = await User.findOne({ google_id });
        const user = await User.findOne({ email });
        if (!user) {
          new User({
            email,
            google_id,
            refreshToken,
          })
            .save()
            .then(async (newUser) => {
              const member = await Member.findOne({ userId: newUser._id });
              if (member) return res.res.status(200).json({ member });

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
            });
        }

        if (user) {
          const member = await Member.findOne({ userId: user._id });
          if (member) {
            return res.redirect('https://localhost:3000/find');
            // return res.status(200).json({ member });
          }
        }
      })
      .catch((error) => {
        // redirect to certain page if failed
        console.log('cannot login');
      });
  },
};
