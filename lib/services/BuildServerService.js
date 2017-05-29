var CircleCIGateway = require('../gateways/CircleCIGateway');
var CircleCIBuildActivity = require('../domain/CircleCIBuildActivity');
var d = require('domain').create();
d.on('error', function(err) {
  console.error(err);
});

var Seq = require('seq');

var BuildServerService = function() {
};

BuildServerService.prototype.getBuildActivity = function(buildConfig, callback) {
  throw new Error('Abstract method!');
},
BuildServerService.prototype.getAllBuilds = function(callback) {

  var that = this;

  Seq(this.config.builds)
    .flatten()
    .parMap(function(buildConfig) {
      that.getBuildActivity(buildConfig, this);
    })
    .seq(function(){
      callback(null,this.stack);
    });
};


module.exports = BuildServerService;
