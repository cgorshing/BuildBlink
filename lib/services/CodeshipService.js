var CodeshipGateway = require('../gateways/CodeshipGateway');
var CodeshipBuildActivity = require('../domain/CodeshipBuildActivity');
var BuildServerService = require('./BuildServerService.js');
var d = require('domain').create();
d.on('error', function(err) {
  console.error(err);
});

var CodeshipService = function (config, injectableGateway) {
  'use strict';
  this.config = config;
  this.gateway = injectableGateway || new CodeshipGateway(config.host, config.apiKey);
};

CodeshipService.prototype = Object.create(BuildServerService.prototype);

CodeshipService.prototype.getBuildActivity = function(buildConfig, callback) {
  'use strict';
  this.gateway.getBuildsForProjectId(buildConfig.id, function(err, jsonBuildActivity) {

    //TODO: delegate to a builder to build a json object / pojo instead of decorator.
    var build = new CodeshipBuildActivity(jsonBuildActivity);

    callback(null, build);
  });
};

module.exports = CodeshipService;
