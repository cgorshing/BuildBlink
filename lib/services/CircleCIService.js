var CircleCIGateway = require('../gateways/CircleCIGateway');
var CircleCIBuildActivity = require('../domain/CircleCIBuildActivity');
var d = require('domain').create();
d.on('error', function(err) {
  console.error(err);
});

var Seq = require('seq');


var CircleCIService = function(config, injectableGateway) {
  this.config = config;
  this.gateway = injectableGateway ||
   new CircleCIGateway(config.token);
};

CircleCIService.prototype = {
  getBuildActivity: function(vcs_type, username, project, callback) {
    this.gateway.getBuildsForProjectId(vcs_type, username, project, function(err, buildActivity) {
      if (buildActivity) callback(null, buildActivity);
      else console.warn('Was not able to get a build activity ... skipping');
    });
  },
  getAllBuilds: function(callback) {

    var that = this;

    Seq(this.config.circleciBuildNumbers)
      .flatten()
      .parMap(function(buildConfig) {
        that.getBuildActivity(buildConfig.vcs_type, buildConfig.username, buildConfig.project, this);
      })
      .seq(function(){
        callback(null,this.stack);
      });
  }
};

module.exports = CircleCIService;
