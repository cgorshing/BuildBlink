var JenkinsGateway = require('../gateways/JenkinsGateway');
var JenkinsBuildActivity = require('../domain/JenkinsBuildActivity');
var d = require('domain').create();
d.on('error', function(err) {
  console.error(err);
});

var Seq = require('seq');


var JenkinsService = function(config, injectableGateway) {
  this.config = config;
  this.gateway = injectableGateway ||
   new JenkinsGateway(config.jenkinsScheme, config.jenkinsHost, config.username, config.apiToken);
};

JenkinsService.prototype = {
  getBuildActivityForBuildId: function(buildId, callback) {
    this.gateway.getBuildsForProjectId(buildId, function(err, buildActivity) {
      callback(null, buildActivity);
    });
  },
  getAllBuilds: function(callback) {

    var that = this;

    Seq(this.config.jenkinsBuildNumbers)
      .flatten()
      .parMap(function(buildConfig) {
        that.getBuildActivityForBuildId(buildConfig.id,this);
      })
      .seq(function(){
        callback(null,this.stack);
      });
  }
};

module.exports = JenkinsService;
