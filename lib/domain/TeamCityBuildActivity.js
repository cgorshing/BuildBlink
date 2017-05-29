var moment = require('moment');
var BuildActivity = require('./BuildActivity');

//This is a decorator for the teamcity build json object.
//TODO: push this into a plain json object, and use a builder to build it.
var TeamCityBuildActivity = function(activityData) {
console.log('Looking at:');
console.log(activityData);
  this.currentBuild = activityData.build[0];
  this.previousBuild = activityData.build[1];

  //ID is unique across teamcity, could just use that.
  this.instanceToken = this.currentBuild.buildTypeId + ':' + this.currentBuild.id;

  BuildActivity.apply(this);
};

TeamCityBuildActivity.prototype = Object.create(BuildActivity.prototype);

TeamCityBuildActivity.prototype._isGreen = function() {
  if(this._isBuilding()) return false;
  if(this.currentBuild.status === 'SUCCESS') return true;
  return false;
};
TeamCityBuildActivity.prototype._isBuilding = function() {
  return this.currentBuild.running || false;
};
TeamCityBuildActivity.prototype._isFailedBuild = function(the_status) {
  return the_status === 'FAILURE' || the_status === 'ERROR';
};
TeamCityBuildActivity.prototype._isPreviousBuildGreen = function(){
  return this.previousBuild.status === 'SUCCESS';
};
TeamCityBuildActivity.prototype._isPreviousBuildRed = function(){
  return this._isFailedBuild(this.previousBuild.status);
};
TeamCityBuildActivity.prototype._startMoment = function(){
  return moment(this.currentBuild.startDate, 'YYYYMMDD HH:mm:ss');
};

module.exports = TeamCityBuildActivity;
