const admin = require('firebase-admin');

/**
 * @name authorized
 * @async
 * @function
 * @description Middleware that provides validation that the user is authorized. Also attaches a decoded user object to the request of this http call for use later.
 * @param {Request} req Request object for this http call
 * @param {Response} res Response object for this http call
 * @param {Next} next callback to trigger the next function in this chain
 */
async function authorized(req, res, next) {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized');
        return;
    }

    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedIdToken;
        next();
    } catch (err) {
        res.status(403).send('Unauthorized');
        return;
    }
}

module.exports = authorized;