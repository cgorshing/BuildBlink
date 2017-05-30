var vsprintf = require('sprintf').sprintf;
var Gateway = require('./Gateway');

var CodeshipGateway = function(server, apiKey) {
  this.server = server; //TODO: remove hard coded default after integration tests.
  this.apiKey = apiKey;
  console.log(this);
  console.log(arguments)
};

//TODO: branches should be removed - this is just to easily test build transition on a throw away branch.
//TODO: support for both https and http
var uriBuildLocatorBase = 'http://%s/api/v1/projects/%s.json?api_key=%s';

CodeshipGateway.prototype = {
  getBuildsForProjectId: function(projectId, callback) {
    if (!projectId) {
      callback("Hmmmm...  you asked me to check a null build.", undefined);
      return;
    }

    var uri = vsprintf(uriBuildLocatorBase, this.server, projectId, this.apiKey);

    console.log('\rSending request to: ' + uri);
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

module.exports = CodeshipGateway;
