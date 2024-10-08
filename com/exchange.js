var ciba = require('oauth2orize-ciba');

exports = module.exports = function(ats, ts) {
  
  return Promise.resolve(null)
    .then(function() {
      // TODO: Load extensions (ie, for issuing ID tokens) prior to this
      
      return ciba.exchange.ciba(function(client, authReqID, cb) {
        
        ts.load(authReqID, function(err, txn) {
          if (err) { return cb(err); }
          
          if (!txn.response) {
            /*
            txn.user = {
              id: '500'
            }
            txn.response = {
              allow: true
            }
            
            ts.update(undefined, authReqID, txn, function() {
              console.log('transaction now approved!');
            })
            */
            
            return cb(new ciba.TokenError('Request is pending authorization', 'authorization_pending'))
          }
          
          var msg = {
            user: txn.user,
            client: txn.client,
            scope: txn.response.scope
          };
          
          ats.issue(msg, function(err, token) {
            if (err) { return cb(err); }
            // TODO: add expiration, etc
            return cb(null, token);
          });
        });
      });
    });
};

exports['@implements'] = 'module:oauth2orize.tokenRequestHandler';
exports['@type'] = 'urn:openid:params:grant-type:ciba';
exports['@require'] = [
  'module:@authnomicon/oauth2.AccessTokenService',
  'module:oauth2orize-ciba.TransactionStore'
];
