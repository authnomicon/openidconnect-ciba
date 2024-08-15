var ciba = require('oauth2orize-ciba').exchange.ciba;


exports = module.exports = function() {
  
  
  // TODO: load extensions (ie, oidc)
  
  return Promise.resolve(null)
    .then(function() {
      
      
      //return function(req, res, next) {
      //  console.log('CIBA?');
      //}
      
      return ciba(function(client, authReqID, cb) {
        console.log('ISSUE...');
        console.log(client);
        console.log(authReqID);
        
        return cb(null, 'G5kXH2wHvUra0sHlDy1iTkDJgsgUO1bN')
        
      });
    });
};

exports['@implements'] = 'module:oauth2orize.tokenRequestHandler';
exports['@type'] = 'urn:openid:params:grant-type:ciba';
