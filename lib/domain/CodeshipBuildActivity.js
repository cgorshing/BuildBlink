var moment = require('moment');
var BuildActivity = require('./BuildActivity');

//This is a decorator for the teamcity build json object.
//TODO: push this into a plain json object, and use a builder to build it.
var CodeshipBuildActivity = function(activityData) {
  this.currentBuild = activityData.builds[0];
  this.previousBuild = activityData.builds[1];

  this.SUCCESS = 'success';
  this.ERROR = 'error';

  this.instanceToken = this.currentBuild.id;

  BuildActivity.apply(this);
};

CodeshipBuildActivity.prototype = Object.create(BuildActivity.prototype);

CodeshipBuildActivity.prototype._isGreen = function() {
  if(this._isBuilding()) return false;

  if(this.currentBuild.status === this.SUCCESS) return true;
    return false;
};
CodeshipBuildActivity.prototype._isBuilding = function() {
  return this.currentBuild.running || false;
};
CodeshipBuildActivity.prototype._isFailedBuild = function(the_status) {
  return the_status === 'FAILURE' || the_status === this.ERROR;
};
CodeshipBuildActivity.prototype._isPreviousBuildGreen = function(){
  return this.previousBuild.status === this.SUCCESS;
};
CodeshipBuildActivity.prototype._isPreviousBuildRed = function(){
  return this._isFailedBuild(this.previousBuild.status);
};
CodeshipBuildActivity.prototype._startMoment = function(){
  return moment(this.currentBuild.startDate, 'YYYYMMDD HH:mm:ss');
};

module.exports = CodeshipBuildActivity;
