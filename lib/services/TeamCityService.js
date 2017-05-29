var TeamCityGateway = require('../gateways/TeamCityGateway');
var TeamCityBuildActivity = require('../domain/TeamCityBuildActivity');
var BuildServerService = require('./BuildServerService.js');
var d = require('domain').create();
d.on('error', function(err) {
  console.error(err);
});

var TeamCityService = function(config, injectableGateway) {
  this.config = config;
  this.gateway = injectableGateway || new TeamCityGateway(config.teamcityHost, config.teamcityPostfix);
};

TeamCityService.prototype = Object.create(BuildServerService.prototype);

TeamCityService.prototype.getBuildActivity = function(buildConfig, callback) {
  this.gateway.getBuildsForProjectId(buildConfig.id, function(err, buildActivity) {
    //TODO: delegate to a builder to build a json object / pojo instead of decorator.
    console.log('Creating BuildActivity from TeamCity');

    callback(null, buildActivity);
  });
};

module.exports = TeamCityService;
