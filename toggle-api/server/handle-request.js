var createResponse = require('./create-response');
var interface = require('./../application/application-interface');
var getDeviceIp = require('./../database').devices.getIp;
var HARD_CODED_DEVICE_ID = 1;

// Do interface-call and send response back
function callInterface(request, response, interfaceCall, createResponseCall) {

    // Enable this part to parse device id from request body
    /*if (!request.body) {
        return createResponse.badRequest("HTTP body not valid JSON", response);
    }
    var deviceId = request.body.id;
    */

    getDeviceIp(HARD_CODED_DEVICE_ID, function (error, deviceIp) {
        if (error) {
            console.log("Error reading database: " + error);
            return createResponse.serverError(error, response);
        }
        interfaceCall(deviceIp, function (error, msg) {
            if (error) {
                console.log("Could not call interface: " + error)
                return createResponse.serverError(error, response);
            }
            createResponseCall(msg, response);
        });
    });
}

// Specify the request actions and responses
var requestActions = {
    powerOn: function (request, response) {
        callInterface(request, response, interface.turnOn, createResponse.on);
    },

    powerOff: function (request, response) {
        callInterface(request, response, interface.turnOff, createResponse.off);
    },

    connectionStatus: function (request, response) {
        callInterface(request, response, interface.connectionStatus, createResponse.connectionStatus);
    }
}

module.exports = requestActions;