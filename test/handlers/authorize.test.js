/* global describe, it */

var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var factory = require('../../com/handlers/authorize');


describe('handlers/authorize', function() {
  
  it('should create handler', function() {
    var authenticator = new Object();
    authenticator.authenticate = sinon.spy();
    var handler = factory(authenticator);
    
    expect(handler).to.be.an('array');
    //expect(authenticator.authenticate).to.be.calledOnce;
    //expect(authenticator.authenticate).to.be.calledWith([ 'session', 'anonymous' ], { multi: true });
  });
  
});
