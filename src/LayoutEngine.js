/**
 * Created by garethr on 26/01/14.
 */

var LayoutEngine = (function () {

    function LayoutEngine() {
        this.deviceWidth = 100;
        this.deviceHeight = 50;
        this.deviceSpacing = deviceWidth + 50;
        this.messageSeperation = 40;
        this.textMessageOffsetSeparationX = 5;
        this.textMessageOffsetSeparationY = 5;
        this.textIndent = 5;
    }
    LayoutEngine.prototype.findDeviceStartPointFromIndex = function (index) {
        return index *this.deviceSpacing + this.deviceWidth/2;
    };
    LayoutEngine.prototype.getMessageHeight = function (messageIndex) {
        return (this.messageSeperation*messageIndex)+this.deviceHeight+this.messageSeperation;
    };

    LayoutEngine.prototype.getMessageTextStartXPosition = function (deviceIndex) {
        return this.findDeviceStartPointFromIndex(deviceIndex)+this.textMessageOffsetSeparationX;
    };
    LayoutEngine.prototype.getMessageTextStartYPosition = function (messageIndex) {
        return this.getMessageHeight(messageIndex)-this.textMessageOffsetSeparationY;
    };



    return LayoutEngine;
})();
