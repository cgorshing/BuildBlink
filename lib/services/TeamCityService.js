var TeamCityGateway = require('../gateways/TeamCityGateway');
var BuildActivity = require('../domain/BuildActivity');
var d = require('domain').create();
d.on('error', function(err) {
  console.error(err);
});

var Seq = require('seq');


var TeamCityService = function(config, injectableGateway) {
  this.config = config;
  this.gateway = injectableGateway || new TeamCityGateway(config.teamcityHost, config.postfix);
};

TeamCityService.prototype = {
    getBuildActivityForBuildId: function(buildId, callback) {

        this.gateway.getBuildsForProjectId(buildId, function(err, buildActivity) {
            d.run(function() {
                callback(null, buildActivity);
            });
        });
    },
    getAllBuilds: function(callback) {

        var that = this;

        Seq(this.config.teamcityBuildNumbers)
        .flatten()
        .parMap(function(buildConfig) {
            that.getBuildActivityForBuildId(buildConfig.id,this);
        })
        .seq(function(){
            callback(null,this.stack);
        });
    }
};

module.exports = TeamCityService;
