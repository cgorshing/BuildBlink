var assert = require('assert');
var should = require('should');
var colors = require('colors');
var prettyjson = require('prettyjson');
var loadConfig = require('./../lib/conf/configure');

var CodeshipService = require('../lib/services/CodeshipService.js');
var CodeshipBuildActivity = require('../lib/domain/CodeshipBuildActivity.js');

var fs = require('fs');

suite('CodeshipService', function() {
  var config;
  var service;
  var mockGateway = {};

  setup(function() {
    config = JSON.parse(fs.readFileSync('./integrationtest/fakeCodeshipConfig.json', "utf8"));
    mockGateway.getBuildsForProjectId = function (projectId, callback) {
      callback(null, {
        "id":10213,
        "repository_name":"codeship/docs",
        "builds":[
          { "id":973711,
            "uuid":"ad4e4330-969d-0131-9581-06786cf8137c",
            "status":"success",
            "commit_id":"96943dc5269634c211b6fbb18896ecdcbd40a047",
            "message":"Merge pull request #34 from codeship/feature/shallow-clone",
            "branch":"master"
          },
          { "id":973712,
            "uuid":"ad4e4330-969d-0131-9581-06786cf8137c",
            "status":"success",
            "commit_id":"96943dc5269634c211b6fbb18896ecdcbd40a047",
            "message":"Merge pull request #34 from codeship/feature/shallow-clone",
            "branch":"master"
          }
      ]
    });
    };
    service = new CodeshipService(config, mockGateway);

  });

  suite('constructor', function() {
    test('should_create_TeamCityService', function() {
      service.should.be.an.instanceOf(Object).and.have.property('gateway', mockGateway);
    });
  });

  suite('getBuildActivity', function() {
    test('should_return_build_activity', function(done) {

      service.getBuildActivity('973711', function(err, result) {
        result.should.be.an.instanceof(CodeshipBuildActivity, "BuildActivity");
        result.currentBuild.id.should.equal(973711);
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
