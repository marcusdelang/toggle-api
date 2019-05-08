var createResponse = require('./create-response');
var interface = require('./../application/application-interface');
var handleErrorResponse = require('./../error').handleErrorResponse;
var util = require('./util');

// Specify the request actions and responses
var requestActions = {
    powerOn: function (request, response) {
        util.deviceTokenFromRequest(request, function (error, deviceToken) {
            if (error) {
                return handleErrorResponse(error, response);
            }
            interface.turnOn(deviceToken, function (error, messageObject) {
                if (error) {
                    return handleErrorResponse(error, response);
                }
                return createResponse.on(messageObject.message, response);
            });
        });
    },

    powerOff: function (request, response) {
        util.deviceTokenFromRequest(request, function (error, deviceToken) {
            if (error) {
                return handleErrorResponse(error, response);
            }
            interface.turnOff(deviceToken, function (error, messageObject) {
                if (error) {
                    return handleErrorResponse(error, response)
                }
                return createResponse.off(messageObject.message, response);
            });
        });
    },

    status: function (request, response) {
        util.deviceTokenFromRequest(request, function (error, deviceToken) {
            if (error) {
                return handleErrorResponse(error, response);
            }
            interface.status(deviceToken, function (error, messageObject) {
                if (error) {
                    return handleErrorResponse(error, response);
                }
                if (!messageObject.json.status_power) {
                    
                }
                let json = {
                    status_power: messageObject.json.status_power
                }
                return createResponse.status(json, response);
            });
        });
    },

    registerDevice: function (request, response) {
        util.ipFromRequest(request, function (error, deviceIp) {
            if (error) {
                return handleErrorResponse(error, response);
            }
            interface.registerNewDevice(deviceIp, function (error, message, deviceToken) {
                if (error) {
                    return handleErrorResponse(error, response);
                }
                return createResponse.registerNewDevice(message, deviceToken, response);
            });
        });
    },

    updateDeviceIp: function (request, response) {
        util.ipFromRequest(request, function (error, deviceIp) {
            if (error) {
                return handleErrorResponse(error, response);
            }
            util.deviceTokenFromRequest(request, function (error, deviceToken) {
                if (error) {
                    return handleErrorResponse(error, response);
                }
                interface.updateDeviceIp(deviceToken, deviceIp, function (error, message) {
                    if (error) {
                        return handleErrorResponse(error, response);
                    }
                    return createResponse.register(message, response);
                });
            });
        });
    },

    isDevice: function (request, response) {
        util.deviceTokenFromRequest(request, function (error, deviceToken) {
            if (error) {
                return handleErrorResponse(error, response);
            }
            interface.isDevice(deviceToken, function (error, message) {
                if (error) {
                    return handleErrorResponse(error, response);
                }
                return createResponse.isDevice(message, response);
            });
        });
    }
}

module.exports = requestActions;