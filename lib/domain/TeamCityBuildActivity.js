var moment = require('moment');

//This is a decorator for the teamcity build json object.
//TODO: push this into a plain json object, and use a builder to build it.
var TeamCityBuildActivity = function(activityData) {
console.log('Looking at:');
console.log(activityData);
  this.currentBuild = activityData.build[0];
  this.previousBuild = activityData.build[1];

  //ID is unique across teamcity, could just use that.
  this.instanceToken = this.currentBuild.buildTypeId + ':' + this.currentBuild.id;
  this.setProperties();
};

TeamCityBuildActivity.prototype = {
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
    if(this.currentBuild.status == 'SUCCESS') return true;
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
  _isFailedBuild: function(the_status) {
    if(the_status === 'FAILURE' ||
       the_status === 'ERROR'
      ) {
      return true;
    }
    else {
      return false;
    }
  },
  _isPreviousBuildRed: function(){
    return _isFailedBuild(this.previousBuild.status);
  },
  _isRed: function(){
    if(!this._isBuilding() && !this._isGreen()){
      return true;
    }
    return false;
  },
  _isFreshlyRed: function(){
    if(this._isBuilding()) return false;

    var isPrevBuildGreen = this.previousBuild.status === 'SUCCESS';
    var isLatestBuildRed = this._isFailedBuild(this.currentBuild.status);

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

module.exports = TeamCityBuildActivity;
