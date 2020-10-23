'use strict';

const base64 = require('base-64');
const Users = require('../../../api-server/models/users-model/users-model.js');
module.exports = (req, res, next) => { 
    //if the there isn't an Authorization header 
  if (!req.headers.authorization) { 
    next('error'); }
  else {
    // req.headers.authorization is equal --->  Authorization: basic <token> so it must be split to take the token only
    let basic = req.headers.authorization.split(' ').pop();
    //split to take the property value from the object
    let [user, pass] = base64.decode(basic).split(':');
    let auth = { user, pass };

    return Users.basicAuth(auth)
      .then( user =>{
        console.log('user',user);
        req.user = user;
        console.log('req.user', req.user);
        req.token = user.tokenGenerator(user);
        console.log('token', req.token);
        next();
      }).catch((err) => next('invalid user name or password'));

  }
  
};