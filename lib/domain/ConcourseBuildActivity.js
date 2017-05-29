var moment = require('moment');
var BuildActivity = require('./BuildActivity');

var ConcourseBuildActivity = function(currentActivityData) {
  this.currentBuild = currentActivityData;
  this.previousBuild = {};

  this.FAILURE = 'failed';
  this.ERROR = 'errored';
  this.SUCCESS = 'succeeded';

  BuildActivity.apply(this);
};

ConcourseBuildActivity.prototype = Object.create(BuildActivity.prototype);

ConcourseBuildActivity.prototype._isGreen = function() {
  if(this._isBuilding()) return false;
  if(this.currentBuild.finished_build.status === this.SUCCESS) return true;
  return false;
};
ConcourseBuildActivity.prototype._isBuilding = function() {
  return this.currentBuild.building || false;
};
ConcourseBuildActivity.prototype._isFailedBuild = function(the_status) {
  return the_status === this.FAILURE || the_status === this.ERROR;
};
ConcourseBuildActivity.prototype._isPreviousBuildGreen = function(){
  return this.previousBuild.status === this.SUCCESS;
};
ConcourseBuildActivity.prototype._isPreviousBuildRed = function(){
  return this.previousBuild.status === this.FAILURE || this.previousBuild.status === this.ERROR;
};
ConcourseBuildActivity.prototype._startMoment = function(){
  return moment(this.currentBuild.finished_build.start_time);
};

module.exports = ConcourseBuildActivity;
