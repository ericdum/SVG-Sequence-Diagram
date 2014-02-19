/**
 * Created by garethr on 26/01/14.
 */

var LayoutEngine = (function () {

    function LayoutEngine() {
        this.deviceWidth = 150;
        this.deviceHeight = 50;
        this.deviceSpacing = this.deviceWidth + 100;
        this.messageSeperation = 40;
        this.textMessageOffsetSeparationX = 5;
        this.textMessageOffsetSeparationY = 5;
        this.textIndent = 5;

        this.devices = [];
        this.messages = [];


    }

    LayoutEngine.prototype.findDeviceIndexFromName = function(name)
    {
        var devices = this.getDevices();

        for (var i = 0; i < devices.length; i++) {
            var device = devices[i];
            if (device.name === name ) {
                return i;
            }
        }
        return -1;
    };

    LayoutEngine.prototype.getDevices = function () {
        return this.devices;
    };



    LayoutEngine.prototype.generateDevices = function () {
        var allDevices = [];
        _.forEach(this.messages, (function(message) { allDevices.push({name:message.from}) ;allDevices.push({name:message.to}) ; }));

        this.devices = _.uniq(allDevices, 'name');
    };

    LayoutEngine.prototype.addMessages = function (newMessages) {
        this.messages =this.messages.concat(newMessages);
        this.generateDevices();
    };


    LayoutEngine.prototype.getMessages = function () {
        return this.messages;
    };
    LayoutEngine.prototype.getMiddleXOfDeviceFromName = function (deviceName) {
        return this.getMiddleXOfDevice(this.findDeviceIndexFromName(deviceName));
    };



    LayoutEngine.prototype.getMiddleXOfDevice = function (deviceIndex) {
        return deviceIndex *this.deviceSpacing + this.deviceWidth/2;
    };


    LayoutEngine.prototype.getMessageHeight = function (messageIndex) {
        return (this.messageSeperation*messageIndex)+this.deviceHeight+this.messageSeperation;
    };

    LayoutEngine.prototype.getMessageTextStartXPositionFromNames = function (toDevice,fromDevice) {

        var toDeviceStart = this.getMiddleXOfDevice(this.findDeviceIndexFromName(toDevice));
        var fromDeviceStart = this.getMiddleXOfDevice(this.findDeviceIndexFromName(fromDevice));
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
