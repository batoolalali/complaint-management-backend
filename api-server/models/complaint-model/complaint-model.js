'use strict';

const Model = require('../mongo.js');
const schema = require('./complaint-schema.js');

class Complaint extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Complaint(schema);
