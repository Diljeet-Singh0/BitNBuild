const express = require('express');
const router = express.Router();
const communityController = require('../controllers/community.controller');
const authMiddleware = require('../middleware/auth');

router.get('/:courseId', authMiddleware, communityController.getCommunity);
router.post('/:courseId/message', authMiddleware, communityController.sendMessage);

module.exports = router;
