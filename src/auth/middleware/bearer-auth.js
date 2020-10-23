const users = require('../../../api-server/models/users-model/users-model.js');

module.exports = (req, res, next) => {
    // send bearer token in the Authorization header when making requests to protected resources
    if (!req.headers.authorization) {
        //if the there isn't an Authorization header 
        next('Invalid Login no auth headers');
    } else {
        // req.headers.authorization is equal --->  Authorization: basic <token> so it must be split to take the token only
        const [auth, token] = req.headers.authorization.split(' ');
        if (auth === 'Bearer') {
            users
                .authenticateToken(token)
                .then((validUser) => {
                    req.user = validUser;
                    next();
                })
                .catch((e) => next('Invalid login', e.message));
        } else { 
            next('Invalid auth header');
        }
    }
};