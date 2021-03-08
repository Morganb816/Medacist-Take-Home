import { createAuthorizedHeaders } from "../utils";

/**
 * @name postComment
 * @description Handles the liking and disliking of a comment.
 * @param {boolean} isLike - is the user trying to like or dislike the comment.
 * @param {*} commentId  - Id of the comment the user is trying to like.
 * @returns {Promise<object>} Created like.
 */
const postComment = async (comment, episodeId) => {
    const requestHeaders = await createAuthorizedHeaders();
    const request = await fetch(`http://localhost:5001/star-wars-app-83455/us-central1/api/comment`, {
        method: 'POST',
        mode: 'cors',
        headers: requestHeaders,
        body: JSON.stringify({
            postId: episodeId,
            comment: comment
        })
    });
    return request.json();
};

export default postComment;