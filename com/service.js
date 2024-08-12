exports = module.exports = function(authenticateHandler) {
  var express = require('express');
  
  var router = new express.Router();
  router.post('/', authenticateHandler);
  
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/oauth2/bc/authorize';
exports['@require'] = [
  './handlers/authenticate'
];
