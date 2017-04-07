var TeamCityService = require('./TeamCityService');
var CodeshipService = require('./CodeshipService');

var ServiceFactory = function () {
  'use strict';

  this.build = function (config) {
    var service;

    if(config.serviceType === 1) {
      return new TeamCityService(config);
    } else {
      return new CodeshipService(config);
    }
  };
};

module.exports = ServiceFactory;