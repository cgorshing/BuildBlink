var vsprintf = require('sprintf').sprintf;
var Gateway = require('./Gateway');

var ConcourseGateway = function(scheme, server) {
  this.scheme = scheme;
  this.server = server;
};

var uriBuildLocatorBase = "%s://%s/api/v1/teams/%s/pipelines/%s/jobs/%s";

ConcourseGateway.prototype = {
  getBuildsForProjectId: function(team, pipeline, name, callback) {
    if (!name) {
      callback("Hmmmm...  you asked me to check a null build.", undefined);
      return;
    }

    var uri = vsprintf(uriBuildLocatorBase, this.scheme, this.server, team, pipeline, name);

    console.log('\rConcourse -- Sending request to: ' + uri);
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

module.exports = ConcourseGateway;
