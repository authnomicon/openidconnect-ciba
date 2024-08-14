/* global describe, it */

var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var factory = require('../../com/handlers/authorize');


describe('handlers/authorize', function() {
  
  it('should create handler', function() {
    var authenticator = new Object();
    authenticator.authenticate = sinon.spy();
    var handler = factory(undefined, authenticator);
    
    expect(handler).to.be.an('array');
    expect(authenticator.authenticate).to.be.calledOnce;
    expect(authenticator.authenticate).to.be.calledWith([ 'oauth2-client-authentication/client_secret_basic', 'oauth2-client-authentication/client_secret_post', 'oauth2-client-authentication/none' ], { session: false });
  });
  
  describe('handler', function() {
    
    // https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html
    it('should handle request from specification', function(done) {
      var service = sinon.stub().yieldsAsync(null);
      var authenticator = new Object();
      authenticator.authenticate = function(name, options) {
        return function(req, res, next) {
          req.user = { id: 's6BhdRkqt3', name: 'My Example Client' };
          next();
        };
      };
      var handler = factory(service, authenticator);
      
      chai.express.use(handler)
        .request(function(req) {
          req.body = {
            scope: 'openid email example-scope',
            client_notification_token: '8d67dc78-7faa-4d41-aabd-67707b374255',
            binding_message: 'W4SCT',
            login_hint_token: 'eyJraWQiOiJsdGFjZXNidyIsImFsZyI6IkVTMjU2In0.eyJzdWJfaWQiOnsiZm9ybWF0IjoicGhvbmUiLCJwaG9uZSI6IisxMzMwMjgxODAwNCJ9fQ.GSqxJsFbIyojdfMBDv3MOyAplCViVkwQWzthCWuu9_gnKIqECZilwANt1HfIh3x3JFjaEq-5MZ_B3qeb11NAvg',
            client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            client_assertion: 'eyJraWQiOiJsdGFjZXNidyIsImFsZyI6IkVTMjU2In0.eyJpc3MiOiJzNkJoZFJrcXQzIiwic3ViIjoiczZCaGRSa3F0MyIsImF1ZCI6Imh0dHBzOi8vc2VydmVyLmV4YW1wbGUuY29tIiwianRpIjoiYmRjLVhzX3NmLTNZTW80RlN6SUoyUSIsImlhdCI6MTUzNzgxOTQ4NiwiZXhwIjoxNTM3ODE5Nzc3fQ.Ybr8mg_3E2OptOSsA8rnelYO_y1L-yFaF_j1iemM3ntB61_GN3APe5cl_-5a6cvGlP154XAK7fL-GaZSdnd9kg'
          };
        })
        .finish(function() {
          expect(service).to.have.been.calledOnce;
          expect(service.getCall(0).args[0].client).to.deep.equal({
            id: 's6BhdRkqt3',
            name: 'My Example Client'
          });
          expect(service.getCall(0).args[0].scope).to.deep.equal([ 'openid', 'email', 'example-scope' ]);
          
          expect(this).to.have.status(200);
          expect(this).to.have.body({
            auth_req_id: '1c266114-a1be-4252-8ad1-04986c5b9ac1',
            expires_in: 120
          });
          done();
        })
        .listen();
      
    }); // should handle request from specification
    
  }); // handler
  
});
