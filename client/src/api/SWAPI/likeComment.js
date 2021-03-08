import { createAuthorizedHeaders, getBaseURL } from "../utils";

/**
 * @name likeDislikeEndpoint
 * @description Handles the liking and disliking of a comment.
 * @param {boolean} isLike - is the user trying to like or dislike the comment.
 * @param {*} commentId  - Id of the comment the user is trying to like.
 * @returns {Promise<object>} Created like.
 */
const likeDislikeEndpoint = async (isLike, commentId) => {
    const requestHeaders = await createAuthorizedHeaders();
    const request = await fetch(`${getBaseURL()}comment/like`, {
        method: 'POST',
        mode: 'cors',
        headers: requestHeaders,
        body: JSON.stringify({
            isLike: isLike,
            commentId: commentId
        })
    });
    return request.json();
};

/**
 * @name likeComment
 * @description Handles the liking of a comment.
 * @param {*} commentId - Id of the comment the user is trying to like.
 * @returns {Promise<object>} Created like.
 */
export const likeComment = (commentId) => likeDislikeEndpoint(true, commentId);

/**
 * @name dislikeComment
 * @description Handles the disliking of a comment.
 * @param {*} commentId - Id of the comment the user is trying to like.
 * @returns {Promise<object>} Created like.
 */
export const dislikeComment = (commentId) => likeDislikeEndpoint(false, commentId);

export default likeDislikeEndpoint;
