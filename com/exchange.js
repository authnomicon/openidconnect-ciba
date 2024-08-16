var ciba = require('oauth2orize-ciba');

exports = module.exports = function(store) {
  
  return Promise.resolve(null)
    .then(function() {
      // TODO: Load extensions (ie, for issuing ID tokens) prior to this
      
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
            //txn.allow = true;
            
            /*
            store.update(undefined, authReqID, txn, function() {
              console.log('transaction now approved!');
            })
            */
            
            return cb(new ciba.TokenError('Request is pending authorization', 'authorization_pending'))
          }
          
          
          console.log('TOKEN IS ALLOWED, ISSUE TOKEN');
          
          
          
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
