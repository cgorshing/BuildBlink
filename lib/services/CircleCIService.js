var CircleCIGateway = require('../gateways/CircleCIGateway');
var CircleCIBuildActivity = require('../domain/CircleCIBuildActivity');
var BuildServerService = require('./BuildServerService.js');
var d = require('domain').create();
d.on('error', function(err) {
  console.error(err);
});

var CircleCIService = function(config, injectableGateway) {
  this.config = config;
  this.gateway = injectableGateway ||
   new CircleCIGateway(config.token);
};

CircleCIService.prototype = Object.create(BuildServerService.prototype);

CircleCIService.prototype.getBuildActivity = function(buildConfig, callback) {
  this.gateway.getBuildsForProjectId(buildConfig.vcs_type, buildConfig.username, buildConfig.project, callback);
};

module.exports = CircleCIService;
