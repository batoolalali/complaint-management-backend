'use strict';

const express = require('express');
const router = express.Router();

const complaint = require('../models/complaint-model/complaint-model.js');

const bearerAuth = require('../../src/auth/middleware/bearer-auth.js');
const permissions = require('../../src/auth/middleware/authorize.js');



//find model middleware in case I want to add models
function getModel(req,res,next){
  let model = req.params.model;
  switch (model) {
  case 'complaint':
    req.model = complaint;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
}
router.param('model', getModel);
router.get('/:model' ,bearerAuth, permissions('read'),handelGetAll);
router.post('/:model',bearerAuth, permissions('create'),handelPost);
router.get('/:model/:id',bearerAuth, permissions('read'),handelGetOne);
router.put('/:model/:id',bearerAuth, permissions('update'),handelUpdate);
router.delete('/:model/:id',bearerAuth, permissions('delete'),handelDelete);

/**
Function handelGetAll
to get all records in a model
*/

function handelGetAll(req,res,next){
  req.model.get()
    .then(results=>{
      let count = results.length;
      res.json({count,results});
    }).catch(next);
}
/**
Function handelGetOne
to get on record by id from a model
 */
function handelGetOne(req,res,next){
  let id = req.params.id;
  req.model.get(id)
    .then(record=>{
      res.json(record);
    }).catch(next);
}

/**
Function handelPost
to add a record to a model
 */
function handelPost(req,res,next){
  req.model.create(req.body)
    .then(results=>{
      res.json(results);
    }).catch(next);
}

/**
Function handelDelete
to delete a record from a model
 */
function handelDelete(req,res,next){
  let id = req.params.id;
  req.model.delete(id)
    .then(record=>{
      res.json(record);
    }).catch(next);
}

/**
Function handelUpdate
to update a record in a model
 */
function handelUpdate(req,res,next){
  let id = req.params.id;
  req.model.update(id, req.body)
    .then(record=>{
      res.json(record);
    }).catch(next);
}
module.exports = router;