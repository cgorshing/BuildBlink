var moment = require('moment');
var BuildActivity = require('./BuildActivity');

var JenkinsBuildActivity = function(currentActivityData) {
  this.currentBuild = currentActivityData;
  this.previousBuild = {};

  BuildActivity.apply(this);
};

JenkinsBuildActivity.prototype = Object.create(BuildActivity.prototype);

JenkinsBuildActivity.prototype._isGreen = function() {
  if(this._isBuilding()) return false;
  if(this.currentBuild.result === 'SUCCESS') return true;
  return false;
};
JenkinsBuildActivity.prototype._isBuilding = function() {
  return this.currentBuild.building || false;
};
JenkinsBuildActivity.prototype._isFailedBuild = function(the_status) {
  return the_status === 'FAILURE' || the_status === 'ERROR';
};
JenkinsBuildActivity.prototype._isPreviousBuildGreen = function(){
  return this.previousBuild.status === 'SUCCESS';
}
JenkinsBuildActivity.prototype._isPreviousBuildRed = function(){
  return this._isFailedBuild(this.previousBuild.status);
}
JenkinsBuildActivity.prototype._startMoment = function(){
  return moment(this.currentBuild.timestamp, 'YYYYMMDD HH:mm:ss');
}

module.exports = JenkinsBuildActivity;
