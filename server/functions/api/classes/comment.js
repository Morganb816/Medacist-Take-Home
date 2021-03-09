const Storable = require("./storable");

/**
 * @name Comment
 * @description Class to represent a comment made by a user on a post
 * @property {string} userId - Id of the user who made the comment.
 * @property {string} comment - Comment made by the user.
 * @property {string} postId - Id of the post (Episode Number) the user commented on.
 * @property {number} likes - Amount of likes this comment has.
 * @property {string} docId - Document Id of this comment.
 * @property {number} userLiked - Number to indicate whether or not the user liked/disliked this comment
 */
class Comment extends Storable {
    constructor(userId, userName, comment, postId, date, likes = 0, docId = '', userLiked = 0) {
        super('likes', 'docId', 'userLiked');
        this.userId = userId;
        this.userName = userName;
        this.comment = comment;
        this.postId = postId;
        this.date = date;
        this.likes = likes;
        this.docId = docId;
        this.userLiked = userLiked;
    }
}

module.exports = Comment;