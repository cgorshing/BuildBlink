var moment = require('moment');

//This is a decorator for the teamcity build json object.
//TODO: push this into a plain json object, and use a builder to build it. 
var CodeshipBuildActivity = function(activityData) {
  console.log(activityData);
  this.currentBuild = activityData.builds[0];
  this.previousBuild = activityData.builds[1];

  this.SUCCESSSTATUS = 'success';
  this.ERRORSTATUS = 'error';

  //ID is unique across teamcity, could just use that.
  this.instanceToken = this.currentBuild.id;
  this.setProperties();
};

CodeshipBuildActivity.prototype = {
  setProperties: function(){
    // this.props = {};
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

    if(this.currentBuild.status === this.SUCCESSSTATUS) return true;
      return false;
  },
  _isBuilding: function() {
    return this.currentBuild.running || false;
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
    if(this.previousBuild.status == 'FAILURE' || this.previousBuild.status == this.ERRORSTATUS) {
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

    var isPrevBuildGreen = this.previousBuild.status == this.SUCCESSSTATUS ? true : false;
    var isLatestBuildRed = this.currentBuild.status == 'FAILURE' || this.currentBuild.status == this.ERRORSTATUS ? true : false;

    if(!isPrevBuildGreen || !isLatestBuildRed) return false;

    var startDate = moment(this.currentBuild.startDate, 'YYYYMMDD HH:mm:ss');
    var endDate = moment();
    var minutesDiff = endDate.diff(startDate, 'minutes');

    return minutesDiff < 60 ? true : false;
  },
  _isFreshlyGreen: function(){
    if(this._isBuilding()) return false;
    if(!this._isPreviousBuildRed() || this._isRed()) return false;

    var startDate = moment(this.currentBuild.startDate, 'YYYYMMDD HH:mm:ss');
    var endDate = moment();
    var minutesDiff = endDate.diff(startDate, 'minutes');

    return minutesDiff < 2 ? true : false;
  }
};

module.exports = CodeshipBuildActivity;
