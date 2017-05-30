var vsprintf = require('sprintf').sprintf;
var prettyjson = require('prettyjson');
var request = require('request');
var Gateway = require('./Gateway');

var TeamCityGateway = function(server, postfix) {
  this.server = server;
  this.postfix = postfix;
};

//TODO: branches should be removed - this is just to easily test build transition on a throw away branch.
//TODO: support for both https and http
var uriBuildLocatorBase = 'http://%s/guestAuth/app/rest/buildTypes/id:%s/builds?locator=running:any,branch:(unspecified:any),lookupLimit:2';

TeamCityGateway.prototype = {
  getBuildsForProjectId: function(projectId, callback) {
    if (!projectId) {
      callback('Hmmmm...  you asked me to check a null build.', undefined);
      return;
    }

    serverAndPostfix = this.server;

    if (this.postfix != null) {
      serverAndPostfix = this.server + '/' + this.postfix;
    }

    var uri = vsprintf(uriBuildLocatorBase, serverAndPostfix, projectId);

    //console.log('Sending request to: ' + uri);
    var options = {
      url: uri,
      method: 'GET',
      json: true,
      headers: {
        'accept': 'application/json'
      }
    };

    var handler = new Gateway();
    handler.requestHandler(options, callback);
  }
};

module.exports = TeamCityGateway;
