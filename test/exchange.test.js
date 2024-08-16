/* global describe, it */

var $require = require('proxyquire');
var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var factory = require('../com/exchange');


describe('exchange', function() {
  
  it('should create exchange', function(done) {
    factory(undefined, undefined)
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
      
      var ts = new Object();
      ts.load = sinon.stub().yieldsAsync(null, {
        client: { id: 's6BhdRkqt3', name: 'My Example Client' },
        request: { scope: [ 'openid', 'email', 'example-scope' ] }
      });
      
      factory(undefined, ts)
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
    }); // should indicate pending authorization request
    
    it('should issue access token', function(done) {
      var cibaSpy = sinon.stub();
      var factory = $require('../com/exchange', {
        'oauth2orize-ciba': {
          exchange: { ciba: cibaSpy }
        }
      });
      
      var ats = new Object();
      ats.issue = sinon.stub().yieldsAsync(null, 'G5kXH2wHvUra0sHlDy1iTkDJgsgUO1bN');
      var ts = new Object();
      ts.load = sinon.stub().yieldsAsync(null, {
        user: { id: '248289761001', emails: [ { value: 'janedoe@example.com' } ] },
        client: { id: 's6BhdRkqt3', name: 'My Example Client' },
        request: { scope: [ 'openid', 'email', 'example-scope' ] },
        response: { allow: true, scope: [ 'openid', 'email' ] }
      });
      
      factory(ats, ts)
        .then(function(handler) {
          issue = cibaSpy.getCall(0).args[0];
          
          var client = {
            id: 's6BhdRkqt3',
            name: 'My Example Client'
          };
          
          issue(client, '1c266114-a1be-4252-8ad1-04986c5b9ac1', function(err, token) {
            if (err) { return done(err); }
            expect(token).to.equal('G5kXH2wHvUra0sHlDy1iTkDJgsgUO1bN');
            done();
          });
        })
        .catch(done);
    }); // should issue access token
    
  }); // exchange
  
});
