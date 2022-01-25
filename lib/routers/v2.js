const express = require('express');
const dataModules = require('../models');
const router = express.Router();
const bearer = require('../middleware/bearer');
const permission = require('../middleware/acl');


router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', bearer, getAll);
router.get('/:model/:id', bearer, getOne);
router.post('/:model', bearer, create);
router.put('/:model/:id', bearer, update);
router.delete('/:model/:id',bearer, handleDelete);

async function getAll(req, res) {
  let records = await req.model.get();
  res.status(200).json(records);
}

async function getOne(req, res) {
  const id = req.params.id;
  let record = await req.model.get(id);
}

async function create(req, res) {
  const obj = await req.body;
  let newRecord = await req.model.create(obj);
  res.status(200).json(newRecord);
}

async function update(req, res) {
  const id = req.params.id;
  const obj = req.body
  let updatedRecord = await req.model.update(id,obj);
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  const id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord)
}

module.exports = router;