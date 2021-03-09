const { getCommentsForPostService, getCommentService, makeCommentService, makeLikeService, unlikeService } = require('../services/comments');
const { validateSchema, authorized} = require('../middleware');
const express = require('express');
const CommentSchema = require('../schemas/Comment.json');
const LikeSchema = require('../schemas/Like.json');
const router = express.Router();

router.get('/post/:postId', [authorized(true)], getCommentsForPostService);
router.get('/:commentId', getCommentService);
router.post('/', [authorized(), validateSchema(CommentSchema)], makeCommentService);
router.post('/like', [authorized(), validateSchema(LikeSchema)], makeLikeService);
router.delete('/like', [authorized(), validateSchema(LikeSchema)], unlikeService);

module.exports = router;