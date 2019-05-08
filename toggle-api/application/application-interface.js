var toggles = require('./../toggles');
var devices = require('./../database').devices;
var errorCodes = require('./../error').errorCodes;
var createErrorObject = require('./../error').createErrorObject;
var util = require('./util');

var interface = {
    turnOn: function (deviceToken, callback) {
        devices.getIp(deviceToken, function (error, ip) {
            if (error) {
                return callback(error, null);
            }
            return util.callToggle(ip, toggles.outlet.on, callback);
        });
    },

    turnOff: function (deviceToken, callback) {
        devices.getIp(deviceToken, function (error, ip) {
            if (error) {
                return callback(error, null);
            }
            return util.callToggle(ip, toggles.outlet.off, callback);
        });
    },

    status: function (deviceToken, callback) {
        devices.getIp(deviceToken, function (error, ip) {
            if (error) {
                return callback(error, null);
            }
            util.callToggle(ip, toggles.outlet.status, callback);
        });
    },

    updateDeviceIp: function (deviceToken, deviceIp, callback) {
        devices.updateIp(deviceToken, deviceIp, function (error, message) {
            if (error) {
                return callback(error, null);
            }
            return callback(null, message);
        });
    },

    registerNewDevice: function (deviceIp, callback) {
        util.makeToken(10, function (newDeviceToken) {
            devices.setIp(newDeviceToken, deviceIp, function (error, message) {
                if (error) {
                    return callback(error);
                }
                return callback(null, message, newDeviceToken);
            });
        });
    },

    isDevice: function (deviceToken, callback) {
        devices.getIp(deviceToken, function (error, deviceIp) {
            if (error) {
                return callback(error, null);
            }
            if (!deviceIp) {
                return callback(createErrorObject('No ip found in database for this device Token', errorCodes.noIp, null), null);
            }
            return callback(null, 'Device with provided Token exists');
        });
    }
}

module.exports = interface;