'use strict';

const mongoose = require('mongoose');

const complaint = mongoose.Schema({
  userName: { type: String, required: true },
  status: { required: true, type: String, default: 'Pending Resolution' },
  description: { required: true, type: 'string' },
  type:{type: String,required:true, enum:['product', 'service']},
  userContact:{type: String, required: true}
});

module.exports = mongoose.model('complaint', complaint);