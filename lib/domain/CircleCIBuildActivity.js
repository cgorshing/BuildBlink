var moment = require('moment');

var CircleCIBuildActivity = function(currentActivityData) {
  this.currentBuild = currentActivityData[0];
  this.previousBuild = currentActivityData[0].previous;

  this.failure = 'failed';
  this.running = 'running';
  this.success = 'success';

  this.setProperties();
};

CircleCIBuildActivity.prototype = {
  setProperties: function(){
    this.isBuildingFromGreen = this._isBuildingFromGreen();
    this.isGreen = this._isGreen();
    this.isBuilding = this._isBuilding();
    this.isBuildingFromRed = this._isBuildingFromRed();
    this.isRed = this._isRed();
    this.isFreshlyRed = this._isFreshlyRed();
    this.isFreshlyGreen = this._isFreshlyGreen();
    this.isPreviousBuildRed = this._isPreviousBuildRed();
  },
  _isGreen: function() {
    if(this._isBuilding()) return false;
    if(this.currentBuild.status == this.success) return true;
    return false;
  },
  _isBuilding: function() {
    return this.currentBuild.status == this.running || false;
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
    if(the_status == this.failure ||
       the_status == this.error ||
       the_status == 'infrastructure_fail' ||
       the_status == 'timedout'
      ) {
      return true;
    }
    else {
      return false;
    }
  },
  _isPreviousBuildRed: function(){
    if(this._isFailedBuild(this.previousBuild.status)) {
      return true;
    }
    else {
      return false;
    }
  },
  _isRed: function(){
    if(!this._isBuilding() && !this._isGreen()){
      return true;
    }
    return false;
  },
  _isFreshlyRed: function(){
    if(this._isBuilding()) return false;

    var isPrevBuildGreen = this.previousBuild.status == this.success;
    var isLatestBuildRed = this._isFailedBuild(this.currentBuild.status);

    if(!isPrevBuildGreen || !isLatestBuildRed) return false;

    var startDate = moment(this.currentBuild.start_time);
    var endDate = moment();
    var minutesDiff = endDate.diff(startDate, 'minutes');

    return minutesDiff < 60 ? true : false;
  },
  _isFreshlyGreen: function(){
    if(this._isBuilding()) return false;
    if(!this._isPreviousBuildRed() || this._isRed()) return false;

    var startDate = moment(this.currentBuild.start_time);
    var endDate = moment();
    var minutesDiff = endDate.diff(startDate, 'minutes');

    return minutesDiff < 2 ? true : false;
  }
};

module.exports = CircleCIBuildActivity;
