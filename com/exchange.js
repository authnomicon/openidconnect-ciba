var ciba = require('oauth2orize-ciba');


exports = module.exports = function(store) {
  
  
  // TODO: load extensions (ie, oidc)
  
  return Promise.resolve(null)
    .then(function() {
      
      
      //return function(req, res, next) {
      //  console.log('CIBA?');
      //}
      
      return ciba.exchange.ciba(function(client, authReqID, cb) {
        console.log('ISSUE...');
        console.log(client);
        console.log(authReqID);
        
        store.load(authReqID, function(err, txn) {
          console.log('LOADED');
          console.log(err);
          console.log(txn);
          
          if (txn.allow == undefined) {
            console.log('ERROR WITH PENDING....');
            
            return cb(new ciba.TokenError('Pending', 'authorization_pending'))
          }
          
          
        });
        
        //return cb(null, 'G5kXH2wHvUra0sHlDy1iTkDJgsgUO1bN')
        
      });
    });
};

exports['@implements'] = 'module:oauth2orize.tokenRequestHandler';
exports['@type'] = 'urn:openid:params:grant-type:ciba';
exports['@require'] = [
  'module:oauth2orize-ciba.TransactionStore'
];
