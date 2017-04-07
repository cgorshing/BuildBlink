var assert = require('assert');
var should = require('should');

var CodeshipGateway = require('../lib/gateways/CodeshipGateway.js');
var fs = require('fs');

suite('CodeshipGateway', function() {
  var config;
  setup(function() {
    // config = JSON.parse(fs.readFileSync('./conf/default/config.json', "utf8"));
  });

  suite('constructor', function() {
    test('should_create_CodeshipGateway', function() {
      var gateway = new CodeshipGateway("testServer", "testApiKey");
      assert.equal(gateway.server, "testServer");
      assert.equal(gateway.apiKey, "testApiKey");
    });
  });

  suite('getBuildForId', function() {
    test('should_get_all_builds_for_project_id', function(done) {

      var gateway = new CodeshipGateway(config);

      gateway.getBuildsForProjectId('BranchingTest_Build', function(err,result) {
        result.count.should.be.above(-1);
      });

      done();
    });
  });
});