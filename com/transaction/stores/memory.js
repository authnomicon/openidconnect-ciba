var ciba = require('oauth2orize-ciba');

exports = module.exports = function() {
  return new ciba.MemoryStore();
};

exports['@singleton'] = true;
exports['@implements'] = 'module:oauth2orize-ciba.TransactionStore';
exports['@require'] = [];
