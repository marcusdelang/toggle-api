var toggles = require('./../toggles');
var getDeviceIp = require('./../database').devices.getIp;
var updateDeviceIp = require('./../database').devices.updateIp;


function handleCallback(error, message, callback) {
    if (error) {
        console.log("Could not call toggles: " + error);
        return callback(error, null);
    }
    callback(null, message);
}

function callToggle(ip, call, callback) {
    call(ip, function (error, message) {
        handleCallback(error, message, callback)
    });
}

var interface = {
    turnOn: function (id, callback) {
        getDeviceIp(id, function (error, ip) {
            if (error) {
                console.log("Error reading database: " + error);
                return createResponse.serverError(error, response);
            }
            callToggle(ip, toggles.outlet.on, callback);
        });
    },

    turnOff: function(ip, callback) {
        callToggle(ip, toggles.outlet.off, callback)
    },

    status: function(ip, callback) {
        callToggle(ip, toggles.outlet.status, callback)
    },

    register: function (deviceId, deviceIp, callback) {
        updateDeviceIp(deviceId, deviceIp, function(error, message){
            if (error) {
                return callback('Device IP not updated: ' + error, null);
            }
            console.log('Device registered');
            return callback(null, 'Device registered');
        });
    }
}

module.exports = interface;