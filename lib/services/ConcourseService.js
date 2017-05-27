var ConcourseGateway = require('../gateways/ConcourseGateway');
var ConcourseBuildActivity = require('../domain/ConcourseBuildActivity');
var d = require('domain').create();
d.on('error', function(err) {
  console.error(err);
});

var Seq = require('seq');


var ConcourseService = function(config, injectableGateway) {
  this.config = config;
  this.gateway = injectableGateway ||
   new ConcourseGateway(config.concourseScheme, config.concourseHost);
};

ConcourseService.prototype = {
  getBuildActivity: function(team, pipeline, name, callback) {
    this.gateway.getBuildsForProjectId(team, pipeline, name, function(err, buildActivity) {
      if (buildActivity) callback(null, buildActivity);
      else console.warn('Was not able to get a build activity ... skipping');
    });
  },
  getAllBuilds: function(callback) {

    var that = this;

    Seq(this.config.concourseBuildNumbers)
      .flatten()
      .parMap(function(buildConfig) {
        that.getBuildActivity(buildConfig.team, buildConfig.pipeline, buildConfig.job_name, this);
      })
      .seq(function(){
        callback(null,this.stack);
      });
  }
};

module.exports = ConcourseService;
