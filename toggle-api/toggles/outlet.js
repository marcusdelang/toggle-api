var req = require('request');

function callOutletOnEndpoint(ip, endpoint, callback) {
    var url = 'http://' + ip + endpoint;
    req.get(url, function (error, response, body) {
        if (error) {
            console.log('Request to outlet failed: ' + error);
            return callback(error, null);
        }
        if (response.statusCode !== 200) {
            console.log('Request to outlet failed: ' + 'outlet returned HTTP + ' + response.statusCode);
            return callback('Outlet did not respond HTTP 200', null);
        }

        return callback(null, body);
    });
}

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