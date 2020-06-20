const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
  return res.json(req.user);
  //   return res.json({
  //     posts: {
  //       title: 'My First Post',
  //       description: "Random data you shouldn't access",
  //     },
  //   });
});

module.exports = router;
