var moment = require('moment');
var BuildActivity = require('./BuildActivity');

var ConcourseBuildActivity = function(currentActivityData) {
  this.currentBuild = currentActivityData;
  this.previousBuild = {};

  this.failure = 'failed';
  this.error = 'errored';
  this.success = 'succeeded';

  BuildActivity.apply(this);
};

ConcourseBuildActivity.prototype = Object.create(BuildActivity.prototype);

ConcourseBuildActivity.prototype._isGreen = function() {
  if(this._isBuilding()) return false;
  if(this.currentBuild.finished_build.status == this.success) return true;
  return false;
};
ConcourseBuildActivity.prototype._isBuilding = function() {
  return this.currentBuild.building || false;
};
ConcourseBuildActivity.prototype._isFailedBuild = function(the_status) {
  return the_status === this.failure || the_status === this.error;
};
ConcourseBuildActivity.prototype._isPreviousBuildGreen = function(){
  return this.previousBuild.status === this.success;
};
ConcourseBuildActivity.prototype._isPreviousBuildRed = function(){
  return this.previousBuild.status == this.failure || this.previousBuild.status == this.error;
};
ConcourseBuildActivity.prototype._startMoment = function(){
  return moment(this.currentBuild.finished_build.start_time);
};

module.exports = ConcourseBuildActivity;
