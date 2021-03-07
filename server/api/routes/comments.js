const { getCommentsForPostService, getCommentService, makeCommentService, makeLikeService, unlikeService } = require('../services/comments');
const { validateSchema } = require('../middleware');
const express = require('express');
const CommentSchema = require('../schemas/Comment.json');
const LikeSchema = require('../schemas/Like.json');
const router = express.Router();

router.get('/post/:postId', getCommentsForPostService);
router.get('/:commentId', getCommentService);
router.post('/', [validateSchema(CommentSchema)], makeCommentService);
router.post('/like', [validateSchema(LikeSchema)], makeLikeService);
router.delete('/like', [validateSchema(LikeSchema)], unlikeService);

module.exports = router;