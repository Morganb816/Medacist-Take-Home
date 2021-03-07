const Storable = require("./storable");

class Like extends Storable {
    constructor(commentId, userId, isLike) {
        super();
        this.commentId = commentId;
        this.userId = userId;
        this.isLike = isLike;
    }
}

module.exports = Like;