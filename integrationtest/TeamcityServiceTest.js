var assert = require('assert');
var should = require('should');
var colors = require('colors');
var prettyjson = require('prettyjson');
var loadConfig = require('./../lib/conf/configure');

var TeamCityService = require('./../lib/services/TeamCityService.js');
var BuildActivity = require('./../lib/domain/BuildActivity.js');

var TeamCityGatewayMock = require('./../lib/gateways/TeamCityGatewayMock.js');

var fs = require('fs');

suite('TeamcityService', function() {
	var config;
	var service;
	var mockGateway;

	setup(function() {
		// config = JSON.parse(fs.readFileSync('./config.json', "utf8"));
		config = require('nconf').get();
    mockGateway = new TeamCityGatewayMock();
		service = new TeamCityService(config, mockGateway);

	});

	suite('constructor', function() {
		test('should_create_TeamCityService', function() {
      //service.should.be.a('object').and.have.property('gateway', mockGateway);
      //service.should.be.a('object');

      console.log("****************************************************************");
      console.log(service.gateway == mockGateway);
      //service.should.have.property('gateway', mockGateway);
		});
	});

	suite('getBuildActivityForBuildId', function() {
		test('should_return_build_activity', function(done) {

			service.getBuildActivityForBuildId('BranchingTest_Build', function(err, result) {
				// console.log(prettyjson.render(result));
				result.should.be.an.instanceof(BuildActivity, "BuildActivity");
				result.currentBuild.buildTypeId.should.equal('BranchingTest_Build');
				done();
			});
		});
	});

	suite('getAllBuilds', function() {
		test('should_return_correct_number_of_BuildActivity_objects', function(done) {

			service.getAllBuilds(function(err, result) {
				should.not.exist(err);
				should.exist(result);
				result.should.be.an.instanceOf(Array);
				result.length.should.be.within(0,2);
				done();
			});
		});
	});
});
