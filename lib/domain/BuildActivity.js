var moment = require('moment');

var BuildActivity = function() {
  if (this.constructor === BuildActivity) {
    throw new Error("Can't instantiate abstract class!");
  }

  this.setProperties();
};

BuildActivity.prototype = {
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
    throw new Error('Abstract method!');
  },
  _isBuilding: function() {
    throw new Error('Abstract method!');
  },
  _isBuildingFromRed: function() {
    if(this._isBuilding() && this._isPreviousBuildRed()) return true;
    return false;
  },
  _isBuildingFromGreen: function() {
    if(this._isBuilding() && !this._isPreviousBuildRed()) return true;
    return false;
  },
  _isFailedBuild: function() {
    throw new Error('Abstract method!');
  },
  _isPreviousBuildGreen: function(){
    throw new Error('Abstract method!');
  },
  _isPreviousBuildRed: function(){
    throw new Error('Abstract method!');
  },
  _startMoment: function(){
    throw new Error('Abstract method!');
  },
  _isRed: function(){
    if(!this._isBuilding() && !this._isGreen()){
      return true;
    }
    return false;
  },
  _isFreshlyRed: function(){
    throw new Error('Abstract method!');
  },
  _isFreshlyGreen: function(){
    throw new Error('Abstract method!');
  },
  _isFreshlyRed: function(){
    if(this._isBuilding()) return false;

    var isPrevBuildGreen = this._isPreviousBuildGreen();
    var isLatestBuildRed = this._isFailedBuild(this.currentBuild.result);

    if(!isPrevBuildGreen || !isLatestBuildRed) return false;

    var startDate = this._startMoment();
    var endDate = moment();
    var minutesDiff = endDate.diff(startDate, 'minutes');

    return minutesDiff < 60 ? true : false;
  },
  _isFreshlyGreen: function(){
    if(this._isBuilding()) return false;
    if(!this._isPreviousBuildRed() || this._isRed()) return false;

    var startDate = this._startMoment();
    var endDate = moment();
    var minutesDiff = endDate.diff(startDate, 'minutes');

    return minutesDiff < 2 ? true : false;
  }
};

module.exports = BuildActivity;
