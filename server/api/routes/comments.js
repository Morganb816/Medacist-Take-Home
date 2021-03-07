const express = require('express');
const { getCommentsForPostService, getCommentService, makeCommentService, makeLikeService, unlikeService } = require('../services/comments');
const router = express.Router();

router.get('/post/:postId', getCommentsForPostService);
router.get('/:commentId', getCommentService);
router.post('/', makeCommentService);
router.post('/like', makeLikeService);
router.delete('/like', unlikeService);

module.exports = router;