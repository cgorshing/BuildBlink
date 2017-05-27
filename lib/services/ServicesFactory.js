var CodeshipService = require('./CodeshipService');
var ConcourseService = require('./ConcourseService');
var JenkinsService = require('./JenkinsService');
var TeamCityService = require('./TeamCityService');

var ServiceFactory = function () {
  'use strict';

  this.build = function (config) {
    var service;

    if(config.serviceType === 1) {
      return new TeamCityService(config);
    } else if (config.serviceType == 2) {
      return new CodeshipService(config);
    } else if (config.serviceType == 3) {
      return new JenkinsService(config);
    } else if (config.serviceType == 4) {
      return new ConcourseService(config);
    } else {
      console.log('Unknown serviceType of ' + config.serviceType + ', only 1, 2, 3, or 4 is understood.');
    }
  };
};

module.exports = ServiceFactory;
