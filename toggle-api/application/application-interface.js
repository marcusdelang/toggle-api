var toggles = require('./../toggles');
var devices = require('./../database').devices;
var utils = require('./utils');

var interface = {
    turnOn: function (id, callback) {
        devices.getIp(id, function (error, ip) {
            if (error) {
                console.log("Error reading database: " + error);
                return createResponse.serverError(error, response);
            }
            utils.callToggle(ip, toggles.outlet.on, callback);
        });
    },

    turnOff: function (id, callback) {
        devices.getIp(id, function (error, ip) {
            if (error) {
                console.log("Error reading database: " + error);
                return createResponse.serverError(error, response);
            }
            return utils.callToggle(ip, toggles.outlet.off, callback);
        });
    },

    status: function (id, callback) {
        devices.getIp(id, function (error, ip) {
            if (error) {
                console.log("Error reading database: " + error);
                return createResponse.serverError(error, response);
            }
            utils.callToggle(ip, toggles.outlet.status, callback);
        });
    },

    updateDeviceIp: function (deviceId, deviceIp, callback) {
        devices.updateIp(deviceId, deviceIp, function (error, message) {
            if (error) {
                return callback('Device IP not updated: ' + error, null);
            }
            console.log('Device IP updated');
            return callback(null, 'Device IP updated');
        });
    },

    registerNewDevice: function (deviceIp, callback) {
        utils.makeId(10, function (newDeviceId) {
            devices.setIp(newDeviceId, deviceIp, function (error, message) {
                if (error) {
                    console.log("Error reading database: " + error);
                    return callback('Error reading database: ' + error, null);
                }
                console.log('Device registered');
                return callback(null, "Device registered", newDeviceId);
            });
        });
    },

    isDevice: function (deviceId, callback) {
        devices.getIp(deviceId, function (error, deviceIp) {
            if (error) {
                console.log("Error reading database: " + error);
                return callback('Error reading database: ' + error, null);
            }
            console.log('Device exists: ' + deviceId + ' : ' + deviceIp);
            return callback(null, 'Device with provided Token exists');
        });
    }
}

module.exports = interface;