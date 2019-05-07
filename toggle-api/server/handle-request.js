var createResponse = require('./create-response');
var interface = require('./../application/application-interface');

function idFromRequest(request, callback) {
    if (!request) {
        return callback("Request undefined", null);
    }
    if (!request.body) {
        return callback("Request body undefined", null)
    }
    if (!request.body.id) {
        return callback("Id undefined", null)
    }
    callback(null, request.body.id);
}

function ipFromRequest(request, callback) {
    if (!request) {
        return callback("Request undefined", null);
    }
    if (!(request.headers['x-forwarded-for'] || request.deviceIp)) {
        return callback("Request deviceIp undefined", null)
    }
    var deviceIp = request.headers['x-forwarded-for'] || request.deviceIp;

    if (deviceIp.match(/::ffff:/)) {
        deviceIp = deviceIp.replace('::ffff:', '');
    }
    if (!deviceIp.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)) {
        return callback('Received invalid IP', null);
    }
    callback(null, deviceIp)
}

// Specify the request actions and responses
var requestActions = {
    powerOn: function (request, response) {
        idFromRequest(request, function (error, id) {
            if (error) {
                console.log('Could not read device id: ' + error);
                return createResponse.badRequest('Could not read device id: ' + error, response);
            }
            interface.turnOn(id, function (error, msg) {
                if (error) {
                    return createResponse.serverError(error, response);
                }
                return createResponse.on(msg, response);
            });
        });
    },

    powerOff: function (request, response) {
        idFromRequest(request, function (error, id) {
            if (error) {
                console.log('Could not read device id: ' + error);
                return createResponse.badRequest('Could not read device id: ' + error, response);
            }
            interface.turnOff(id, function (error, msg) {
                if (error) {
                    console.log("Could not call interface: " + error)
                    return createResponse.serverError(error, response);
                }
                return createResponse.off(msg, response);
            });
        });
    },

    status: function (request, response) {
        idFromRequest(request, function (error, id) {
            if (error) {
                console.log('Could not read device id: ' + error);
                return createResponse.badRequest('Could not read device id: ' + error, response);
            }
            interface.status(id, function (error, msg) {
                if (error) {
                    console.log("Could not call interface: " + error)
                    return createResponse.serverError(error, response);
                }
                return createResponse.status(msg, response);
            });
        });
    },

    registerDevice: function (request, response) {
        ipFromRequest(request, function (error, deviceIp) {
            if (error) {
                console.log(error);
                return createResponse.badRequest("Could not read client IP", response);
            }
            interface.registerNewDevice(deviceIp, function (error, message, id) {
                if (error) {
                    console.log('Could not register new device: ' + error);
                    return createResponse.serverError('Could not register new device', response);
                }
                return createResponse.registerNewDevice(message, id, response);
            });
        });
    },

    updateDeviceIp: function (request, response) {
        ipFromRequest(request, function (error, deviceIp) {
            if (error) {
                console.log(error);
                return createResponse.badRequest("Could not read client IP", response);
            }
            idFromRequest(request, function (error, deviceId) {
                if (error) {
                    console.log(error);
                    return createResponse.badRequest("Could not read device id: " + error, response);
                }
                interface.updateDeviceIp(deviceId, deviceIp, function (error, message) {
                    return createResponse.register(message, response);
                });
            });
        });
    },

    isDevice: function (request, response) {
        idFromRequest(request, function (error, deviceId) {
            if (error) {
                console.log(error);
                return createResponse.badRequest("Could not read device id: " + error, response);
            }
            interface.isDevice(deviceId, function (error, message) {
                if (error) {
                    return createResponse.notFound("Device not found: " + error, response);
                }
                return createResponse.isDevice(message, response);
            });
        });
    }
}

module.exports = requestActions;