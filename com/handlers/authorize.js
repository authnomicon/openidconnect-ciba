var aaa = require('aaatrio');

exports = module.exports = function(service, authenticator) {
  
  function go(req, res, next) {
    console.log('BC AUTHORIZE!');
    console.log(req.body)
    
    //var zreq = new aaa.Request(req.client);
    // TODO: populate req.client with client auth
    // TODO: authenticate based on hints, if possible to set req.user
    var zreq = new aaa.Request(req.client);
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
        
        return res.json({
          auth_req_id: '1c266114-a1be-4252-8ad1-04986c5b9ac1',
          expires_in: 120
        });
      }
    
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
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    //authenticator.authenticate(['oauth2-client-authentication/client_secret_basic', 'oauth2-client-authentication/client_secret_post', 'oauth2-client-authentication/none'], { session: false }),
    //parse('application/x-www-form-urlencoded'),
    //authenticate('oauth2-client-authentication/*'),
    go
  ];
};

exports['@require'] = [
  'http://i.authnomicon.org/oauth2/AuthorizationService',
  'module:passport.Authenticator'
];
