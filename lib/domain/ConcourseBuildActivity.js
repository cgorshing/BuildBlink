var moment = require('moment');

var ConcourseBuildActivity = function(currentActivityData) {
  this.currentBuild = currentActivityData;
  this.previousBuild = {};

  this.failure = 'failed';
  this.error = 'errored';
  this.success = 'succeeded';

  this.setProperties();
};

ConcourseBuildActivity.prototype = {
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
    if(this.currentBuild.finished_build.status == this.success) return true;
    return false;
  },
  _isBuilding: function() {
    return this.currentBuild.building || false;
  },
  _isBuildingFromRed: function() {
    if(this._isBuilding() && this._isPreviousBuildRed()) return true;
    return false;
  },
  _isBuildingFromGreen: function() {
    if(this._isBuilding() && !this._isPreviousBuildRed()) return true;
    return false;
  },
  _isPreviousBuildRed: function(){
    if(this.previousBuild.status == this.failure || this.previousBuild.status == this.error) {
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
    var isLatestBuildRed = this.currentBuild.finished_build.status == this.failure || this.currentBuild.finished_build.status == this.error ? true : false;

    if(!isPrevBuildGreen || !isLatestBuildRed) return false;

    var startDate = moment(this.currentBuild.finished_build.start_time);
    var endDate = moment();
    var minutesDiff = endDate.diff(startDate, 'minutes');

    return minutesDiff < 60 ? true : false;
  },
  _isFreshlyGreen: function(){
    if(this._isBuilding()) return false;
    if(!this._isPreviousBuildRed() || this._isRed()) return false;

    var startDate = moment(this.currentBuild.finished_build.start_time);
    var endDate = moment();
    var minutesDiff = endDate.diff(startDate, 'minutes');

    return minutesDiff < 2 ? true : false;
  }
};

module.exports = ConcourseBuildActivity;
