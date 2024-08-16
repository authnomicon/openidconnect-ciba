/* global describe, it */

var $require = require('proxyquire');
var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var factory = require('../com/exchange');


describe('exchange', function() {
  
  it('should create exchange', function(done) {
    factory(undefined)
      .then(function(handler) {
        expect(handler).to.be.a('function');
      })
      .then(done, done);
  });
  
  describe('issue', function() {
    
    it('should indicate pending authorization request', function(done) {
      var cibaSpy = sinon.stub();
      var factory = $require('../com/exchange', {
        'oauth2orize-ciba': {
          exchange: { ciba: cibaSpy }
        }
      });
      
      var store = new Object();
      store.load = sinon.stub().yieldsAsync(null, {
        client: { id: 's6BhdRkqt3', name: 'My Example Client' },
        request: { scope: [ 'openid', 'email', 'example-scope' ] }
      });
      
      factory(store)
        .then(function(handler) {
          issue = cibaSpy.getCall(0).args[0];
          
          var client = {
            id: 's6BhdRkqt3',
            name: 'My Example Client'
          };
          
          
          issue(client, '1c266114-a1be-4252-8ad1-04986c5b9ac1', function(err) {
            expect(err).to.be.an.instanceOf(Error);
            expect(err.message).to.equal('Request is pending authorization');
            expect(err.code).to.equal('authorization_pending');
            expect(err.status).to.equal(403);
            done();
          });
        })
        .catch(done);
      
    }); // should issue access token
    
    
  }); // exchange
  
});
