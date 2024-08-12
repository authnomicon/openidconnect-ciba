exports = module.exports = function(service, parse, authenticate, state) {
  
  function go(req, res, next) {
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
    //parse('application/x-www-form-urlencoded'),
    //authenticate('oauth2-client-authentication/*'),
    go
  ];
};

exports['@require'] = [
  'http://i.authnomicon.org/openidconnect/ciba/AuthorizationService',
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/authenticate',
];
