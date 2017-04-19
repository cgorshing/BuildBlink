var assert = require('assert');
var should = require('should');
var nock = require('nock');

var TeamCityGateway = require('./../lib/gateways/TeamCityGateway.js');
var BuildActivity = require('./../lib/domain/TeamCityBuildActivity.js');
var fs = require('fs');

suite('TeamCityGateway', function() {
  //var config;

  beforeEach(function() {
    nock('http://localhost')
      .get('/guestAuth/app/rest/buildTypes/id:BranchingTest_Build/builds?locator=running:any,branch:(unspecified:any),lookupLimit:2')
      .replyWithFile(200, __dirname + '/samples/teamcityApi/success.json');
  });

  setup(function() {
    //config = JSON.parse(fs.readFileSync('./lib/conf/config.json', "utf8"));
  });

  suite('constructor', function() {
    test('should_create_TeamCityGateway', function(done) {
      var gateway = new TeamCityGateway("testServer");
      assert.equal(gateway.server, "testServer");
      done();
    });
  });

  suite('getBuildsForProjectId', function() {
    test('should_get_all_builds_for_project_id', function(done) {

      var gateway = new TeamCityGateway("localhost");

      gateway.getBuildsForProjectId('BranchingTest_Build', function(err,result) {
        result.should.be.an.instanceof(BuildActivity);
        done();
      });
    });
  });
});
