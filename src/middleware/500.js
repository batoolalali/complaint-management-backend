'use strict';

/**
Sends 500 Response
 */
module.exports = (err, req, res, next) => {
  res.status(500);
  res.statusMessage = 'Server Error';
  res.json({error:err});
};