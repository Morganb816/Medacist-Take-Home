const admin = require('firebase-admin');
const { Comment, Like } = require('../classes');
const { getDataIfExists, getDocs, getCreatedData } = require('./utils');

const COMMENTS_COLLECTION = 'comments';
const LIKES_COLLECTION = 'likes';
const COMMENT_ID = 'commentId';
const USER_ID = 'userId';
const POST_ID = 'postId';

const NO_LIKE_FOUND = 'No Like Found';

/**
 * @name findLikeOnCommentForUser
 * @description Finds a like on a comment by a user.
 * @param {string} commentId Id of comment to filter by.
 * @param {string} userId Id of user to filter by.
 * @returns {Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>}
 */
const findLikeOnCommentForUser = (commentId, userId) => admin.firestore()
.collection(LIKES_COLLECTION)
.where(COMMENT_ID, '==', commentId)
.where(USER_ID, '==', userId)
.get()

/**
 * @name getLikesFromLikeArray
 * @description Returns the total amount of likes (accounting for dislikes) from a given like array.
 * @param {Like[]} likeArray Array of likes to total
 * @returns {number}
 */
const getLikesFromLikeArray = likeArray => likeArray.reduce((totalLikes, currentLike) => {
    if (currentLike.isLike) {
        return totalLikes + 1;
    }
    return totalLikes - 1;
}, 0);

/**
 * @name getLikesForComment
 * @description Returns an array of `Like`'s for a given comment
 * @param {string} docId Id of the document containing the comment we wish to get likes for
 * @returns {Like[]}
 */
const getLikesForComment = (docId) => getDocs(
    admin.firestore()
        .collection(LIKES_COLLECTION)
        .where(COMMENT_ID, '==', docId)
        .get()
);

/**
 * @name makeLike
 * @description Like a comment by id
 * @param {string} commentId Id of the comment to like/dislike
 * @param {string} userId Id of the user liking/disliking the comment
 * @param {boolean} isLike Is this a like or dislike
 * @returns {Like}
 */
const makeLike = async (commentId, userId, isLike) => getCreatedData(
    admin.firestore()
        .collection(LIKES_COLLECTION)
        .add(new Like(commentId, userId, isLike).getStorable())
);

/**
 * @name alreadyLiked
 * @description Function to check wether or not a user already liked or disliked a function.
 * @param {string} commentId Id of the comment to check if already liked/disliked.
 * @param {string} userId Id of the user to check if they already liked/disliked.
 * @returns {boolean}
 */
const alreadyLiked = async (commentId, userId) => {
    const foundLike = await getLike(commentId, userId);
    return !!foundLike;
}

/**
 * @name getLike
 * @description Function to retrieve a like from a user on a comment.
 * @param {string} commentId Id of the comment to check if already liked/disliked.
 * @param {string} userId Id of the user to check if they already liked/disliked.
 * @returns {boolean}
 */
const getLike = async (commentId, userId) => {
    const foundLike = await findLikeOnCommentForUser(commentId, userId);
    if (!foundLike.docs.length) throw new Error(NO_LIKE_FOUND);
    return foundLike.docs[0];
};

/**
 * @name deleteLike
 * @description Function to delete a users like on a given comment.
 * @param {string} commentId Id of the comment to check if already liked/disliked.
 * @param {string} userId Id of the user to check if they already liked/disliked.
 * @returns {boolean}
 */
const deleteLike = async (commentId, userId) => {
    const foundLikes = await findLikeOnCommentForUser(commentId, userId);
    return Promise.all(foundLikes.docs.map(doc => doc.ref.delete()));
}

/**
 * @name makeComment
 * @description Creates a comment for a post by a user.
 * @param {string} userId Id of user creating this comment
 * @param {string} comment Comment user wishes to make
 * @param {string} postId Post this comment is realted to (Episode Number)
 * @returns {Comment}
 */
const makeComment = async (userId, comment, postId) => getCreatedData(
    admin.firestore()
        .collection(COMMENTS_COLLECTION)
        .add(new Comment(userId, comment, postId).getStorable())
);

/**
 * @name getComment
 * @description Returns a comment for a provided docID.
 * @param {string} docId Document ID of the comment we wish to retrieve.
 * @returns {Comment}
 */
const getComment = async (docId) => {
    const [foundComment, foundLikes] = await Promise.all([
        getDataIfExists(admin.firestore().collection(COMMENTS_COLLECTION).doc(docId).get()),
        getLikesForComment(docId)
    ]);

    return new Comment(foundComment.userId, foundComment.comment, foundComment.postId, getLikesFromLikeArray(foundLikes)).getData();
}

/**
 * @name getCommentsForPost
 * @description Retrieves all comments for a post (Episode)
 * @param {string} postId Id of the post we wish to retrieve comments for (Episode Number)
 * @returns {Comment[]}
 */
const getCommentsForPost = async (postId) => {
    const commentQuery = await admin.firestore()
            .collection(COMMENTS_COLLECTION)
            .where(POST_ID, '==', postId)
            .get();

    const likesArray = await Promise.all(commentQuery.docs.map(doc => getLikesForComment(doc.id)));
    
    const comments = commentQuery.docs.map((commentRef, i) => {
        const commentData = commentRef.data();
        return new Comment(commentData.userId, commentData.comment, commentData.postId, getLikesFromLikeArray(likesArray[i])).getData();
    });

    return comments;
};

module.exports = {
    makeComment,
    getComment,
    getCommentsForPost,
    makeLike,
    deleteLike, 
    alreadyLiked
};