'use strict';

function error404(req, res, next) {
  const errorObject = {
    status: 404,
    message:'Not Found'
  };
  res.status(404).send(errorObject);
}

module.exports =error404;