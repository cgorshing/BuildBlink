var assert = require('assert');
var should = require('should');
var nock = require('nock');

var TeamCityService = require('./../lib/services/TeamCityService.js');
var TeamCityGateway = require('./../lib/gateways/TeamCityGateway.js');
var fs = require('fs');

var teamcityNock = nock('http://127.0.0.1')
  .get('/guestAuth/app/rest/buildTypes/id:BranchingTest_Build/builds?locator=running:any,branch:(unspecified:any),lookupLimit:2')
  .replyWithFile(200, __dirname + '/samples/teamcityApi/success.json');
var teamcityNock2 = nock('http://127.0.0.1')
  .get('/guestAuth/app/rest/buildTypes/id:BranchingTest_Build/builds?locator=running:any,branch:(unspecified:any),lookupLimit:2')
  .replyWithFile(200, __dirname + '/samples/teamcityApi/success.json');

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
      service.should.be.an.instanceOf(Object).and.have.property('gateway', mockGateway);
    });
  });

  suite('getBuildForId', function() {
    test('should_get_all_builds_for_project_id', function() {
      service.getAllBuilds(function(something, stack) {
        console.error('getAllBuilds result back');
      });
    });
  });

  suite('getBuildActivityForId', function() {
    test('should_get_build_activity_for_project_id', function() {
      service.getBuildActivityForBuildId('BranchingTest_Build', function(err, activity) {
        activity.should.have.property('isBuildingFromGreen', false);
        activity.should.have.property('isBuildingFromGreen', false);
        activity.should.have.property('isGreen', true);
        activity.should.have.property('isBuilding', false);
        activity.should.have.property('isBuildingFromRed', false);
        activity.should.have.property('isRed', false);
        activity.should.have.property('isFreshlyRed', false);
        activity.should.have.property('isFreshlyGreen', false);
        activity.should.have.property('isPreviousBuildRed', true);
      });
    });
  });
});
