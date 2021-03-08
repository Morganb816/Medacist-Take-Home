/**
 * @typedef Person
 * @property {string} birth_year - Year person was born.
 * @property {string[]} films - Array of endpoints of films person was in.
 * @property {string} gender - persons gender.
 * @property {string} hair_color - persons hair color.
 * @property {string} height - height in CM
 * @property {string} homeworld - Endpoint to retrieve details about this persons home world.
 * @property {string} mass - Persons weight.
 * @property {string} name - Persons name.
 * @property {string} skin_color - Persons skin color.
 * @property {string} created - Date this entry was created.
 * @property {string} edited - Date this entry was last edited.
 * @property {string[]} species - Array of endpoints to retrieve data about a species this charecter is
 * @property {string[]} starships - Array of endpoints to retrieve data about a starthips this character is related to.
 * @property {string} url - Endpoint used to retrieve data about this person.
 * @property {string[]} vehicles - Array of endpoints to retrieve data about a vehicles this character is related to.
 */

/**
 * @name getPerson
 * @description Retrieves a person from SWAPI api.
 * @param {string} personId - Id of person to retrieve.
 * @returns {Promise<Person>} A person.
 */
const getPerson = async (personId) => {
    const request = await fetch(`https://swapi.dev/api/people/${personId}/`, {
        method: 'GET',
    });
    return request.json();
}

export default getPerson;