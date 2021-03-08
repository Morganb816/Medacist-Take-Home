import { createAuthorizedHeaders, getBaseURL } from "../utils";

/**
 * @name unlikeComment
 * @description Handles the unliking and disliking of a comment.
 * @param {string} commentId  - Id of the comment the user is trying to unlike.
 * @returns {Promise<object>} Created like.
 */
const unlikeComment = async (commentId) => {
    const requestHeaders = await createAuthorizedHeaders();
    await fetch(`${getBaseURL()}comment/like`, {
        method: 'DELETE',
        mode: 'cors',
        headers: requestHeaders,
        body: JSON.stringify({
            commentId: commentId
        })
    });
    return true;
};

export default unlikeComment;