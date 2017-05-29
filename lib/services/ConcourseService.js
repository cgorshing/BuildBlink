var ConcourseGateway = require('../gateways/ConcourseGateway');
var ConcourseBuildActivity = require('../domain/ConcourseBuildActivity');
var BuildServerService = require('./BuildServerService.js');
var d = require('domain').create();
d.on('error', function(err) {
  console.error(err);
});

var ConcourseService = function(config, injectableGateway) {
  this.config = config;
  this.gateway = injectableGateway ||
   new ConcourseGateway(config.concourseScheme, config.concourseHost);
};

ConcourseService.prototype = Object.create(BuildServerService.prototype);

ConcourseService.prototype.getBuildActivity = function(buildConfig, callback) {
  this.gateway.getBuildsForProjectId(buildConfig.team, buildConfig.pipeline, buildConfig.name, function(err, buildActivity) {
    if (buildActivity) callback(null, buildActivity);
    else console.warn('Was not able to get a build activity ... skipping');
  });
};

module.exports = ConcourseService;
