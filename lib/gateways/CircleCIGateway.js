var vsprintf = require('sprintf').sprintf;
var request = require('request');
var prettyjson = require('prettyjson');
var BuildActivity = require('../domain/CircleCIBuildActivity');

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

    request(options, function(error, response, body) {
//console.log('Error is: ' + error);
//console.log('Response size is: ' + typeof response);
//console.log('Body is: ' + body);
      if (error) {
        //console.log(prettyjson.render(error));
        //console.error(error.code);
        if (error.code === "ENOTFOUND" && typeof response === "undefined") {
          // We might just be having an internet issue (wireless has dropped ..etc)
          // So let's fail more silently and try to continue
          console.warn('Possible internet connection issue ...'.yellow);
          //TODO Find a way to set the color to maybe a blinking yellow color
        }
        if(error.code === "ECONNREFUSED"){
          console.error("Connection refused from uri: " + uri);
          //TODO This might be the same action as above.
        }
        if (typeof response !== "undefined" && response.statusCode === 404) {
          console.error("HTTP Response 404 when searching for: " + uri);
          callback(vsprintf("Build %s not found", projectId));
          //TODO This might warrant a full stop as it might be a config error
        }
        // if you get UNABLE_TO_VERIFY_LEAF_SIGNATURE
        // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        callback(error, null);
      } else {
        callback(null, new BuildActivity(body));
      }
    });
  }
};

module.exports = CircleCIGateway;
