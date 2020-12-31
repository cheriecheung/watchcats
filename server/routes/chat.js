const router = require('express').Router();
const ChatController = require('../controllers/ChatController');
const { validateToken } = require('../helpers/token')

router.get('/chat/list', validateToken, ChatController.getChatList);
router.get('/chat/conversation', validateToken, ChatController.getChatConversation);

module.exports = router;
