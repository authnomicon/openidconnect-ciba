var aaa = require('aaatrio');

exports = module.exports = function(service, store, authenticator) {
  
  function authorize(req, res, next) {
    // The 'user' property of `req` holds the authenticated user.  In the case
    // of the backchannel authentication endpoint, the property will contain the
    // OAuth 2.0 client.
    var client = req.user;
    
    var scope = req.body.scope;
    var clientNotificationToken = req.body.client_notification_token;
    var acrValues = req.body.acr_values;
    var loginHintToken = req.body.login_hint_token;
    var idTokenHint = req.body.id_token_hint;
    var loginHint = req.body.login_hint;
    var bindingMessage = req.body.binding_message;
    var userCode = req.body.user_code;
    var requestedExpiry = req.body.requested_expiry;
    
    if (scope) {
      scope = scope.split(' ');
    }
    if (acrValues) {
      acrValues = acrValues.split(' ');
    }
    
    
    
    // TODO: authenticate based on hints, if possible to set req.user
    var zreq = new aaa.Request(client);
    zreq.scope = scope;
    //zreq.user = txn.user;
    //zreq.prompts = txn.req.prompt;
    //zreq.loginHint = txn.req.loginHint;
    
    
    // TODO: set up "session"
    
    
    service(zreq, function(err, zres) {
      if (err) { return cb(err); }
      
      
      console.log('SERVICED!');
      console.log(zres);
      
      if (!zres) {
        // Serialize the session (transaction).
        
        // WTF: why would this be the case.  should error if no response
        
        
        return res.json({
          auth_req_id: '1c266114-a1be-4252-8ad1-04986c5b9ac1',
          expires_in: 120
        });
      }
      
      console.log('SERIALIZING TRANSACTION');
      var txn = {
        client: client,
        req: {
          scope: scope
        }
      }
      
      store.store(req, txn, function(err, tid) {
        console.log('STORED!');
        console.log(err);
        console.log(tid);
        
        if (err) { return next(err); }
        res.locals.transactionID = tid;
        next();
        
        
        
        /*
        return res.json({
          auth_req_id: tid,
          expires_in: 120
        });
        */
      })
      
      
      return;
      
      
      
      return res.json({
        auth_req_id: '1c266114-a1be-4252-8ad1-04986c5b9ac1',
        expires_in: 120
      });
    
    });
    
    
    return;
    
    var scope = req.body.scope;
    var clientNotificationToken = req.body.client_notification_token;
    var acrValues = req.body.acr_values;
    var loginHintToken = req.body.login_hint_token;
    var idTokenHint = req.body.id_token_hint;
    var loginHint = req.body.login_hint;
    var bindingMessage = req.body.binding_message;
    var userCode = req.body.user_code;
    var requestedExpiry = req.body.requested_expiry;
    
    
    var azreq = new Request(req.oauth2.client, req.oauth2.user)
    // TODO: add scope, etc
    
    service(azreq, function(err, azres) {
      var body = {
        auth_req_id: azres.id,
        expires_in: azres.expiresIn,
        interval: azres.interval
      };
      
      res.json(body);
    });
  }
  
  function prompt(req, res, next) {
    next();
  }
  
  function respond(req, res, next) {
    console.log(res.locals);
    
    return res.json({
      auth_req_id: res.locals.transactionID,
      expires_in: 120
    });
  }
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    authenticator.authenticate(['oauth2-client-authentication/client_secret_basic', 'oauth2-client-authentication/client_secret_post', 'oauth2-client-authentication/none'], { session: false }),
    authorize,
    prompt,
    respond
  ];
};

exports['@require'] = [
  'http://i.authnomicon.org/oauth2/AuthorizationService',
  'module:oauth2orize-ciba.TransactionStore',
  'module:passport.Authenticator'
];
