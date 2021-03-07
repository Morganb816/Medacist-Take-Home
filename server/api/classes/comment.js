const Storable = require("./storable");

/**
 * @name Comment
 * @description Class to represent a comment made by a user on a post
 * @property {string} userId - Id of the user who made the comment.
 * @property {string} comment - Comment made by the user.
 * @property {string} postId - Id of the post (Episode Number) the user commented on.
 * @property {number} likes - Amount of likes this comment has.
 */
class Comment extends Storable {
    constructor(userId, comment, postId, likes = 0) {
        super('likes');
        this.userId = userId;
        this.comment = comment;
        this.postId = postId;
        this.likes = likes;
    }
}

module.exports = Comment;