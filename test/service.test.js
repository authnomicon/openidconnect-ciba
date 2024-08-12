/* global describe, it, expect */

var expect = require('chai').expect;
var factory = require('../com/service');


describe('service', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal('http://i.bixbyjs.org/http/Service');
    expect(factory['@path']).to.equal('/oauth2/bc-authorize');
  });
  
  it('should create service', function() {
    function authorizeHandler() {};
  
    var service = factory(authorizeHandler);
    
    expect(service).to.be.a('function');
    expect(service.length).to.equal(3);
  });
  
});
