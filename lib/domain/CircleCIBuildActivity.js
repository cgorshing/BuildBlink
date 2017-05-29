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

//CircleCIBuildActivity.prototype = {
CircleCIBuildActivity.prototype = Object.create(BuildActivity.prototype, {
  _isGreen: function() {
    if(this._isBuilding()) return false;
    if(this.currentBuild.status === this.success) return true;
    return false;
  },
  _isBuilding: function() {
    return this.currentBuild.status === this.running || false;
  },
  _isBuildingFromRed: function() {
    if(this._isBuilding() && this._isPreviousBuildRed()) return true;
    return false;
  },
  _isBuildingFromGreen: function() {
    if(this._isBuilding() && !this._isPreviousBuildRed()) return true;
    return false;
  },
  _isFailedBuild: function(the_status) {
    return the_status === this.failure ||
       the_status === this.error ||
       the_status === 'infrastructure_fail' ||
       the_status === 'timedout';
  },
  _isPreviousBuildGreen: function(){
    return this.previousBuild.status === this.success;
  },
  _isPreviousBuildRed: function(){
    return this._isFailedBuild(this.previousBuild.status);
  },
  _startMoment: function(){
    return moment(this.currentBuild.start_time);
  }
});

module.exports = CircleCIBuildActivity;
