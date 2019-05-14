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
    on: function (ip, token, callback) {
        callOutletOnEndpoint(ip, token, endpoints.on, callback)
    },

    off: function (ip, token, callback) {
        callOutletOnEndpoint(ip, token, endpoints.off, callback);
    },

    status: function (ip, token, callback) {
        callOutletOnEndpoint(ip, token, endpoints.status, callback);
    }
}

function callOutletOnEndpoint(ip, token, endpoint, callback) {
    let url = 'http://' + ip + endpoint;
    let options = {
        method: 'post',
        url: url,
        body: { token: token },
        timeout: 7000,
        json: true
    }
    req(options, function (error, response, body) {
        if (error) {
            let message = 'Api could not send request to toggle-io. \n' +
                'Either something is wrong in the server, or the toggle-io software is not activated.'
            return callback(createErrorObject(message, errorCodes.server, error), null);
        }
        if (response.statusCode === 500) {
            return callback(createErrorObject('toggle-io device had internal problem.', errorCodes.errorAtReceiver, null), null);
        }
        if (response.statusCode !== 200) {
            return callback(createErrorObject('Api sent bad request to toggle-io.', errorCodes.sentBadRequest, null), null);
        }
        let responseJson;
        if (body) {
            responseJson = JSON.stringify(body);
        }
        let messageObject = {
            message: 'Command was succesfully accepted by toggle-io device.',
            json: responseJson
        }
        return callback(null, messageObject);
    });
}