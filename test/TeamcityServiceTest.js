var assert = require('assert');
var should = require('should');

var TeamCityService = require('./../lib/services/TeamCityService.js');
var TeamCityGateway = require('./../lib/gateways/TeamCityGateway.js');
var fs = require('fs');

suite('TeamCityService', function() {
	var config;
	var service;
	var mockGateway;

	setup(function() {
    mockGateway = new TeamCityGateway('127.0.0.1');
		config = JSON.parse(fs.readFileSync('./lib/conf/config.json', "utf8"));
		service = new TeamCityService(config,mockGateway);
	});

	suite('constructor', function() {
		test('should_create_TeamCityService', function() {
			//service.should.be.a('object').and.have.property('gateway', mockGateway);
      service.should.be.an.instanceOf(Object).and.have.property('gateway', mockGateway);
		});
	});

	suite('getBuildForId', function() {
		test('should_get_all_builds_for_project_id', function() {

			//TODO: me.


		});
	});
});
