var assert = require('assert');
var should = require('should');
var nock = require('nock');

var CodeshipGateway = require('../lib/gateways/CodeshipGateway.js');
var fs = require('fs');

suite('CodeshipGateway', function() {
  var config;
  setup(function() {
    // config = JSON.parse(fs.readFileSync('./conf/default/config.json', "utf8"));
  });

  beforeEach(function() {
    nock('http://localhost')
      .get('/api/v1/projects/BranchingTest_Build.json?api_key=testApiKey')
      .replyWithFile(200, __dirname + '/samples/codeshipApi/success.json');
  });

  suite('constructor', function() {
    test('should_create_CodeshipGateway', function() {
      var gateway = new CodeshipGateway('localhost', 'testApiKey');
      assert.equal(gateway.server, 'localhost');
      assert.equal(gateway.apiKey, 'testApiKey');
    });
  });

  suite('getBuildForId', function() {
    test('should_get_all_builds_for_project_id', function(done) {

      var gateway = new CodeshipGateway('localhost', 'testApiKey');

      gateway.getBuildsForProjectId('BranchingTest_Build', function(err,result) {
        result.count.should.be.above(-1);
      });

      done();
    });
  });
});
