var assert = require('assert');
var should = require('should');

var CodeshipService = require('./../lib/services/CodeshipService.js');
var fs = require('fs');

suite('CodeshipService', function() {
  var config;
  var service;
  var mockGateway;

  setup(function() {
    config = JSON.parse(fs.readFileSync('./lib/conf/config.json', "utf8"));
    service = new CodeshipService(config,mockGateway);
  });

  suite('constructor', function() {
    test('should_create_CodeshipService', function() {
      service.should.be.a('object').and.have.property('gateway', mockGateway);
    });
  });

  suite('getBuildForId', function() {
    test('should_get_all_builds_for_project_id', function() {

      //TODO: me.


    });
  });
});