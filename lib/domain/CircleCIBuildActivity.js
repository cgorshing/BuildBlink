var moment = require('moment');
var BuildActivity = require('./BuildActivity');

var CircleCIBuildActivity = function(currentActivityData) {
  this.currentBuild = currentActivityData[0];
  this.previousBuild = currentActivityData[0].previous;

  this.failure = 'failed';
  this.running = 'running';
  this.success = 'success';

  BuildActivity.apply(this);
};

CircleCIBuildActivity.prototype = Object.create(BuildActivity.prototype);

CircleCIBuildActivity.prototype._isGreen = function() {
  if(this._isBuilding()) return false;
  if(this.currentBuild.status === this.success) return true;
  return false;
};
CircleCIBuildActivity.prototype._isBuilding = function() {
  return this.currentBuild.status === this.running || false;
};
CircleCIBuildActivity.prototype._isFailedBuild = function(the_status) {
  return the_status === this.failure ||
     the_status === this.error ||
     the_status === 'infrastructure_fail' ||
     the_status === 'timedout';
};
CircleCIBuildActivity.prototype._isPreviousBuildGreen = function(){
  return this.previousBuild.status === this.success;
};
CircleCIBuildActivity.prototype._isPreviousBuildRed = function(){
  return this._isFailedBuild(this.previousBuild.status);
};
CircleCIBuildActivity.prototype._startMoment = function(){
  return moment(this.currentBuild.start_time);
};

module.exports = CircleCIBuildActivity;
