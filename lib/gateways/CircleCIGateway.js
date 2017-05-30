var vsprintf = require('sprintf').sprintf;
var Gateway = require('./Gateway');

var CircleCIGateway = function(token) {
  this.token = token;
};

var uriBuildLocatorBase = "https://circleci.com/api/v1.1/project/%s/%s/%s?circle-token=%s&limit=1";

CircleCIGateway.prototype = {
  getBuildsForProjectId: function(vcs_type, username, project, callback) {
    if (!project) {
      callback("Hmmmm...  you asked me to check a null build.", undefined);
      return;
    }

    var uri = vsprintf(uriBuildLocatorBase, vcs_type, username, project, this.token);


    console.log('\rCircleCI -- Sending request to: ' + uri);

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

module.exports = CircleCIGateway;
