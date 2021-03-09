const admin = require('firebase-admin');

/**
 * @name authorized
 * @async
 * @function
 * @param {boolean} looselyAuthorized - If true, the middleware will not throw an error if the user is not authorized.
 * @description Middleware that provides validation that the user is authorized. Also attaches a decoded user object to the request of this http call for use later.
 * @returns {Function}
 */
const authorized = (looselyAuthorized = false) => async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        if (looselyAuthorized) {
            next();
            return;
        }
        res.status(403).send('Unauthorized');
        return;
    }

    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedIdToken;
        next();
    } catch (err) {
        console.log(err);
        res.status(403).send('Unauthorized');
        return;
    }
}

module.exports = authorized;