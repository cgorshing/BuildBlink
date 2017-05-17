var vsprintf = require('sprintf').sprintf;
var request = require('request');
var prettyjson = require('prettyjson');
var BuildActivity = require('../domain/JenkinsBuildActivity');

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
var uriBuildLocatorBase = "%s://%s/job/%s/lastBuild/api/json?tree=result,building,number";

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

    request(options, function(error, response, body) {
      if (error) {
        console.log(prettyjson.render(error));
        if(error.code == "ECONNREFUSED"){
          console.error("Connection refused from uri: " + uri);
        }
        // if you get UNABLE_TO_VERIFY_LEAF_SIGNATURE
        // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        callback(error, null);
      }
      if (response.statusCode === 404) {
        console.error("HTTP Response 404 when searching for: " + uri);
        callback(vsprintf("Build %s not found", projectId));
      }

      callback(null, new BuildActivity(body));
    });
  }
};

module.exports = JenkinsGateway;
