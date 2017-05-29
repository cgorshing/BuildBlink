var assert = require('assert');
var should = require('should');
var colors = require('colors');
var prettyjson = require('prettyjson');
var loadConfig = require('./../lib/conf/configure');

var TeamCityService = require('../lib/services/TeamCityService.js');
var TeamCityBuildActivity = require('../lib/domain/TeamCityBuildActivity.js');

var fs = require('fs');

suite('TeamcityService', function() {
  var config;
  var service;
  var mockGateway = {};

  setup(function() {
    //config = require('nconf').get();
    config = JSON.parse(fs.readFileSync('./integrationtest/fakeTeamCityConfig.json', 'utf8'));
    mockGateway.getBuildsForProjectId = function (projectId, callback) {
      callback(null, new TeamCityBuildActivity({ build: [{buildTypeId: projectId, id: ''}, {buildTypeId: '', id: ''}]}));
    };
    service = new TeamCityService(config, mockGateway);
  });

  suite('constructor', function() {
    test('should_create_TeamCityService', function() {
      service.should.be.an.instanceOf(Object).and.have.property('gateway', mockGateway);
    });
  });

  suite('getBuildActivity', function() {
    test('should_return_build_activity', function(done) {

      service.getBuildActivity( { id: 'BranchingTest_Build' }, function(err, result) {
        result.should.be.an.instanceof(TeamCityBuildActivity, 'BuildActivity');
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
