import { createAuthorizedHeaders, getBaseURL } from "../utils";

/**
 * @typedef Comment
 * @property {string} userId - Id of user who made the comment.
 * @property {comment} comment - The comment.
 * @property {string} postId - Id of episode this comment belongs to.
 * @property {number} likes - Amount of likes this comment has (includes dislikes).
 */

/**
 * @name getComments
 * @description Retrieves comments for a Episode.
 * @param {string} episodeId - Id of episode to retrieve comments for.
 * @returns {Promise<Comment[]>} Array of comments.
 */
const getComments = async (episodeId, isAuthorized) => {
    const headers = isAuthorized ? await createAuthorizedHeaders() : {};
    const request = await fetch(`${getBaseURL()}comment/post/${episodeId}/`, {
        method: 'GET',
        headers: headers
    });
    return request.json();
};

export default getComments