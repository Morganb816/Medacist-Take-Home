import getFilms from './getFilms';
import getPerson from './getPerson';
import getComments from './getComments';
import { likeComment, dislikeComment } from './likeComment';
import unlikeComment from './unlikeComment';
import postComment from './postComment';

/**
 * @name SWAPI
 * @description Object to interface with the SWAPI API.
 * @property {function} getFilms - Retrieves films from SWAPI API.
 */
const SWAPI = {
    getFilms,
    getPerson,
    getComments,
    likeComment,
    dislikeComment,
    unlikeComment,
    postComment
}

export default SWAPI;