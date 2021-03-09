const { makeComment, getComment, getCommentsForPost, makeLike, alreadyLiked, deleteLike } = require('../db/comments');
const { ErrorCode, serviceFactory } = require('../utils');

const notSpecifiedLike = new ErrorCode('NOT_SPECIFIED_LIKE', 403, 'Did not specify wether to like or dislike the comment');
const noCommentIdProvided = new ErrorCode('NO_COMMENT_ID', 403, 'No comment id provided. Please provide a comment id');
const noPostIdProvided = new ErrorCode('NO_POST_ID', 403, 'No post id provided. Please provide a post id');
const invalidCommentLength = new ErrorCode('INVALID_COMMENT_LENGTH', 403, 'Comment cannot be empty');

/**
 * @name makeCommentService
 * @description Service to handle make comment request coming from the client
 */
const makeCommentService = serviceFactory(async (req, res) => {
    if (!req.body.comment.length) invalidCommentLength.emit();
    const madeComment = await makeComment(req.user.uid, req.user.name, req.body.comment, req.body.postId, Date.now());
    res.status(200).send(madeComment);
}, [invalidCommentLength]);

/**
 * @name unlikeService
 * @description Service to handle "unliking" a comment
 */
const unlikeService = serviceFactory(async (req, res) => {
    if (!req.body.commentId) noCommentIdProvided.emit();
    
    await deleteLike(req.body.commentId, req.user.uid);
    res.status(200).send();
}, [noCommentIdProvided]);

/**
 * @name makeLikeService
 * @description Service to handle liking/disliking a comment
 */
const makeLikeService = serviceFactory(async (req, res) => {
    if (!req.body.commentId) noCommentIdProvided.emit();
    if (req.body.isLike === undefined) notSpecifiedLike.emit();
    
    try {
        await alreadyLiked(req.body.commentId, req.user.uid);
        await deleteLike(req.body.commentId, req.user.uid);
    } catch (err) {
        if (err.message !== 'No Like Found') {
            throw new Error(err.message);
        }
    }

    const madeLike = await makeLike(req.body.commentId, req.user.uid, req.body.isLike);
    res.status(200).send(madeLike);
}, [notSpecifiedLike, noCommentIdProvided]);

/**
 * @name getCommentsForPostService
 * @description Service to handle sending comments for a given post(Episode ID) to the client
 */
const getCommentsForPostService = serviceFactory(async (req, res) => {
    if (!req.params.postId) noPostIdProvided.emit();
    const foundComments = await getCommentsForPost(req.params.postId, req?.user?.uid);
    res.status(200).send(foundComments);
}, [noPostIdProvided]);

/**
 * @name getCommentService
 * @description Service to handle retriving a single comment and sending it to the client.
 */
const getCommentService = serviceFactory(async (req, res) => {
    if (!req.params.commentId) noCommentIdProvided.emit();

    const foundComment = await getComment(req.params.commentId, req?.user?.uid);
    res.status(200).send(foundComment);
}, [noCommentIdProvided]);

module.exports = {
    makeCommentService,
    makeLikeService,
    getCommentService,
    getCommentsForPostService,
    unlikeService
}