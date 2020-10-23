'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const SECRET = process.env.SECRET;

const Users = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'customer', enum: ['admin', 'customer'] },
});

const customer = ['read', 'create'];
const admin = ['read', 'create', 'update', 'delete'];



//Hashing the password and save a record
Users.pre('save', async function () {
  //Pre middleware functions are executed one after another, when each middleware calls next.
  // beforeSave => do the hash() 
  this.password = await bcrypt.hash(this.password, 5);
});

// Basic Auth takes an authentication object and returns hashed password
Users.statics.basicAuth = function (auth) {
  // compare  password with a hashed password
  let password = { username: auth.user };
  return this.findOne(password)
    .then(user => {
      return user.passwordComparator(auth.pass);
    })
    .catch(console.error);
};

/**
Password Comparator
takes The authentication object 
returns password if valid
*/
Users.methods.passwordComparator = function (pass) {
  return bcrypt.compare(pass, this.password)
    .then(valid => {
      return valid ? this : null;
    });
};

/**
Can function to check capabilities
takes The roles array 
and return array of  capabilities
*/
Users.methods.can = function (role) {
  let capabilities;
  if (role === 'customer')
    capabilities = customer;
  else if (role === 'admin') {
    capabilities = admin;
  }
  return capabilities;
};

/**
Token Generator
returns {object} token
*/

Users.methods.tokenGenerator = function () {
  let capabilities = this.can(this.role);
  let token =
    jwt.sign({ role: this.role, id: this._id, user: this.username, capabilities: capabilities, expiresIn: 900000}, SECRET); return token;
};

/**
 * Authenticate Token
 * @param {string} token - The token  
 * @returns {object} user token object
 */

Users.statics.authenticateToken = async function (token) {
  try {
    let tokenObject = await jwt.verify(token, SECRET);

    if (tokenObject.user) {
      return Promise.resolve(tokenObject);
    } else {
      return Promise.reject('User is not found!');
    }
  } catch (e) {
    return Promise.reject(e.message);
  }
};

/**
list
returns {Array} list of user 
*/

Users.statics.list = async function () {
  let results = await this.find({});
  return results;
};


module.exports = mongoose.model('users', Users);