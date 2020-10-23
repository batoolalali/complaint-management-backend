'use strict';
const dotenv = require('dotenv');
dotenv.config();
const server = require('./src/server.js');
const mongoose = require('mongoose');

const MONGODB_URI=process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


server.start();