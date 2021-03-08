/**
 * @typedef Movie
 * @property {string[]} characters - Array of enpoints to retrieve characters in this film.
 * @property {string} created - date entry was created.
 * @property {string} director - Name of director of this film.
 * @property {string} edited - date this entry was last edited.
 * @property {number} episode_id - episode ID of this film.
 * @property {string} opening_crawl - description of this movie.
 * @property {string[]} planets - Array of endpoints to retrieve planets in this film.
 * @property {string[]} starships - Array of endpoints to retrieve starships in this film.
 * @property {string} title - Title of this film.
 * @property {string} url - Endpoint used to retrieve this film.
 * @property {string[]} vehicles - Array of endpoints to retrieve vehicles in this film.
 */

/**
 * @name getFilms
 * @description Retrieves array of films from SWAPI api.
 * @returns {Promise<Movie[]>} Array of films.
 */
const getFilms = async () => {
    const request = await fetch('https://swapi.dev/api/films/', {
        method: 'GET',
    });
    const json = await request.json();
    return json.results;
}

export default getFilms;