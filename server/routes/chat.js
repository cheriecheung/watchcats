const router = require('express').Router();
const ChatController = require('../controllers/ChatController');
const { verifyAccessTokenUpdate } = require('../helpers/token')

router.get('/chat/list', verifyAccessTokenUpdate, ChatController.getChatList);
router.get('/chat/conversation', verifyAccessTokenUpdate, ChatController.getChatConversation);

module.exports = router;
