const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

router.post('/comment/:id', commentController.postComment);

router.get('/comment/:id', commentController.getCommentById);



module.exports = router;