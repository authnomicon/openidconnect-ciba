/* global describe, it */

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
  
});
