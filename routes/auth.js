const router = require('express').Router();
const User = require('../model/User');

router.post('/register', async (req, res) => {
  console.log(req.headers);
  console.log(req.body);
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
    const savedUser = await user.save();
    return res.status(201).json({ savedUser });
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ err });
  }
});

module.exports = router;
