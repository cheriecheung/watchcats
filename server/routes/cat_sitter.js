const router = require('express').Router();
const CatSitterController = require('../controllers/CatSitterController');
const { verifyAccessToken } = require('../helpers/token')
const { verify } = require('jsonwebtoken')

router.get('/sitter/profile/:id?', CatSitterController.getProfile);

router.get('/sitter/account/:id?', async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) return res.status(401).json('Access deined');

    try {
        const bearer = bearerHeader.split(' ');
        const accessToken = bearer[1].toString();
        console.log({ bearerHeader, accessToken })
        await verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        return next();
    } catch (err) {
        console.log({ err })
        // return res.status(401).json('Invalid token')
    }
}, CatSitterController.getAccount);
router.post('/sitter/account/:id?', verifyAccessToken, CatSitterController.postAccount);

module.exports = router;
