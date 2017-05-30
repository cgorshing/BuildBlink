var JenkinsGateway = require('../gateways/JenkinsGateway');
var JenkinsBuildActivity = require('../domain/JenkinsBuildActivity');
var BuildServerService = require('./BuildServerService.js');
var d = require('domain').create();
d.on('error', function(err) {
  console.error(err);
});

var JenkinsService = function(config, injectableGateway) {
  this.config = config;
  this.gateway = injectableGateway ||
   new JenkinsGateway(config.jenkinsScheme, config.jenkinsHost, config.username, config.apiToken);
};

JenkinsService.prototype = Object.create(BuildServerService.prototype);

JenkinsService.prototype.getBuildActivity = function(buildConfig, callback) {
  this.gateway.getBuildsForProjectId(buildConfig.id, function(err, buildActivity) {
    if (buildActivity) callback(null, new JenkinsBuildActivity(buildActivity));
    else console.warn('Was not able to get a build activity ... skipping');
  });
};

module.exports = JenkinsService;
