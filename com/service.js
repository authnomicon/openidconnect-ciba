var express = require('express');

exports = module.exports = function(authorizeHandler) {
  var router = express.Router();
  router.post('/', authorizeHandler);
  
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/oauth2/bc-authorize';
exports['@require'] = [
  './handlers/authorize'
];
