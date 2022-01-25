'use strict';

const express = require('express');
const authRouter = express.Router();

const { userModel } = require('../models');
const basicAuth  = require('../middleware/basic');
const bearerAuth = require('../middleware/bearer');
const permissions = require('../middleware/acl');

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await userModel.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
})

authRouter.post('/signin', basicAuth, async (req, res, next) => {
  try {
    const user = {
    user: req.user,
    token: req.user.token,
  };
    res.status(200).json(user);
  } catch (e) {
    next(e.message);
  }
});

authRouter.get('/users', bearerAuth, permissions('deleteUser'), async (req, res, next) => {
  try {
    const allUsers = await userModel.findAll({});
    const list = allUsers.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    next(e.message);
  }
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Access granted');

});



module.exports = authRouter;