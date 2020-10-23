'use strict';

/**
Sends 404 Response
 */

module.exports = (req,res) => {
  res.status(404);
  res.statusMessage = 'Resource Not Found';
  res.json({error:'Not Found'});
};