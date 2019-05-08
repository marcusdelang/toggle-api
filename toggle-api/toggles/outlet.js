var req = require('request');
var createErrorObject = require('./../error').createErrorObject;
var errorCodes = require('./../error').errorCodes;

// Define endpoint corresponding to endpoints on toggle-io device
var endpoints = {
    on: '/on',
    off: '/off',
    status: '/status'
}

// Specify actions for endpoints
module.exports = {
    on: function (ip, callback) {
        callOutletOnEndpoint(ip, endpoints.on, callback)
    },

    off: function (ip, callback) {
        callOutletOnEndpoint(ip, endpoints.off, callback);
    },

    status: function (ip, callback) {
        callOutletOnEndpoint(ip, endpoints.status, callback);
    }
}

function callOutletOnEndpoint(ip, endpoint, callback) {
    var url = 'http://' + ip + endpoint;
    req.get(url, function (error, response, body) {
        if (error) {
            let message = 'Api could not send request to toggle-io. \n' +  'Either something is wrong in the server, or the toggle-io software is not activated.'
            return callback(createErrorObject(message, errorCodes.server, error), null);
        }
        if (response.statusCode !== 200) {
            return callback(createErrorObject('Api sent bad request to toggle-io.', errorCodes.sentBadRequest, null), null);
        }
        let responseJson;
        if (body) {
            responseJson = JSON.parse(body);
        }
        let messageObject = {
            message: 'Command was succesfully accepted by toggle-io device.',
            json: responseJson
        }
        return callback(null, messageObject);
    });
}