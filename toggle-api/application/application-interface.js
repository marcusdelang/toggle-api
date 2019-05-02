var toggles = require('./../toggles');

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
    turnOn: function(ip, callback){
        callToggle(ip, toggles.outlet.on, callback);
    },

    turnOff: function(ip, callback) {
        callToggle(ip, toggles.outlet.off, callback)
    },

    connectionStatus: function(ip, callback) {
        callToggle(ip, toggles.outlet.connectionStatus, callback)
    }
}

module.exports = interface;