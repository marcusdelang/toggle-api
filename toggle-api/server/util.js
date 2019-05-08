var errorCodes = require('./../error').errorCodes;

function createErrorObject(message, code, error) {
    let errorObject = {
        message: message,
        code: code,
        error, error
    }
    return errorObject;
}

function deviceTokenFromRequest(request, callback) {

    if (!request) {
        return callback(createErrorObject('Request undefined', errorCodes.server, null), null);
    }
    if (!request.body) {
        return callback(createErrorObject('Request body undefined', errorCodes.server, null), null);
    }
    if (!request.body.token) {
        return callback(createErrorObject('token undefined', errorCodes.noToken), null);
    }
    return callback(null, request.body.token);
}

function ipFromRequest(request, callback) {
    if (!request) {
        return callback(createErrorObject('Request undefined', errorCodes.server, null), null);
    }
    if (!(request.headers['x-forwarded-for'] || request.connection.remoteAddress)) {
        return callback(createErrorObject('Request ip undefined', errorCodes.noIp, null), null)
    }
    var deviceIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    
    // Trim off IPv6/IPv4 compatibility head
    if (deviceIp.match(/::ffff:/)) {
        deviceIp = deviceIp.replace('::ffff:', '');
    }
    if (!deviceIp.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)) {
        return callback(createErrorObject('Received invalid IP', errorCodes.invalidIp, null), null);
    }
    callback(null, deviceIp)
}

module.exports = {
    deviceTokenFromRequest: deviceTokenFromRequest,
    ipFromRequest: ipFromRequest
}