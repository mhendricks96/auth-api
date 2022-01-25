'use strict';

const { userModel } = require('../models');

module.exports = async (req, res, next) => {

  try {
    if (!req.headers.authorization) {
      return _authError();
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await userModel.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token
    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
};
