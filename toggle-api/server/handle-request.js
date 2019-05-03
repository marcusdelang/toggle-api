var createResponse = require('./create-response');
var interface = require('./../application/application-interface');
var HARD_CODED_DEVICE_ID = 1;

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
    if (!(request.headers['x-forwarded-for'] || request.ip)) {
        return callback("Request ip undefined", null)
    }
    var ip = request.headers['x-forwarded-for'] || request.ip;

    if (ip.match(/::ffff:/)) {
        ip = ip.replace('::ffff:', '');
    }
    if (!ip.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)) {
        return callback('Received invalid IP', null);
    } 
    callback(null, ip)
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
        interface.turnOff(HARD_CODED_DEVICE_ID, function (error, msg) {
            if (error) {
                console.log("Could not call interface: " + error)
                return createResponse.serverError(error, response);
            }
            return createResponse.off(msg, response);
        });
    },

    status: function (request, response) {
        interface.status(deviceIp, function (error, msg) {
            if (error) {
                console.log("Could not call interface: " + error)
                return createResponse.serverError(error, response);
            }
            return createResponse.status(msg, response);
        });
    },

    register: function (request, response) {
        ipFromRequest(request, function (error, ip) {
            if (error) {
                console.log(error);
                return createResponse.badRequest("Could not read client IP", response);
            }
            idFromRequest(request, function (error, deviceId) {
                if (error) {
                    console.log(error);
                    return createResponse.badRequest("Could not read device id: " + error, response);
                }
                interface.register(deviceId, ip, function (error, message) {
                    return createResponse.register(message, response);
                });
            });
        });
    }
}

module.exports = requestActions;