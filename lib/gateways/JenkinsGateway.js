var vsprintf = require('sprintf').sprintf;
var prettyjson = require('prettyjson');
var Gateway = require('./Gateway');

//API token is new since 1.426
//The version is determined by HTTP Header  X-Jenkins
//https://wiki.jenkins-ci.org/display/JENKINS/Authenticating+scripted+clients

var JenkinsGateway = function(scheme, server, username, apiToken) {
  this.scheme = scheme;
  this.server = server;
  this.username = username;
  this.apiToken = apiToken;
};

//TODO: branches should be removed - this is just to easily test build transition on a throw away branch.
//TODO: support for both https and http
var uriBuildLocatorBase = "%s://%s/job/%s/lastBuild/api/json?tree=result,building,number,timestamp";

JenkinsGateway.prototype = {
  getBuildsForProjectId: function(projectId, callback) {
    if (!projectId) {
      callback("Hmmmm...  you asked me to check a null build.", undefined);
      return;
    }

    var uri = vsprintf(uriBuildLocatorBase, this.scheme, this.server, projectId);

    console.log('\rJENKINS -- Sending request to: ' + uri);
    var options = {
      url: uri,
      method: 'GET',
      json: true,
      headers: {
        'accept': 'application/json',
        'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.apiToken).toString('base64')
      }
    };

    var handler = new Gateway();
    handler.requestHandler(options, callback);
  }
};

module.exports = JenkinsGateway;
