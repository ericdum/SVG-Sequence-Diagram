/**
 * Created by garethr on 26/01/14.
 */

var LayoutEngine = (function () {

    function LayoutEngine() {
        this.deviceWidth = 100;
        this.deviceHeight = 50;
        this.deviceSpacing = this.deviceWidth + 50;
        this.messageSeperation = 40;
        this.textMessageOffsetSeparationX = 5;
        this.textMessageOffsetSeparationY = 5;
        this.textIndent = 5;

    }
    LayoutEngine.prototype.getMiddleXOfDevice = function (deviceIndex) {
        return deviceIndex *this.deviceSpacing + this.deviceWidth/2;
    };


    LayoutEngine.prototype.getMessageHeight = function (messageIndex) {
        return (this.messageSeperation*messageIndex)+this.deviceHeight+this.messageSeperation;
    };

    LayoutEngine.prototype.getMessageTextStartXPosition = function (toDeviceIndex,fromDeviceIndex) {

        var toDeviceStart = this.getMiddleXOfDevice(toDeviceIndex);
        var fromDeviceStart = this.getMiddleXOfDevice(fromDeviceIndex);
        if(toDeviceStart< fromDeviceStart )
        {
            return toDeviceStart+this.textMessageOffsetSeparationX;
        }
        else
        {
            return fromDeviceStart+this.textMessageOffsetSeparationX;
        }
    };

    LayoutEngine.prototype.getMessageTextStartYPosition = function (messageIndex) {
        return this.getMessageHeight(messageIndex)-this.textMessageOffsetSeparationY;
    };

    LayoutEngine.prototype.getDeviceXPosition = function (deviceIndex) {
        return deviceIndex*this.deviceSpacing;
    };

    LayoutEngine.prototype.getDeviceTextX = function (deviceIndex) {
        return this.deviceSpacing*deviceIndex+this.textIndent;
    };

    LayoutEngine.prototype.getDeviceTextY = function () {
        return this.deviceHeight/2;
    };

    return LayoutEngine;
})();
