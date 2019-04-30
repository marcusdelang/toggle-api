var createResponse = require('./create-response');
var interface = require('./application-interface');
const TEMP_ID_HARD_CODED = 1;

// Template to create response
function callInterface(request, response, interfaceCall, createResponseCall) {
    var reqBody = JSON.parse(request.body);
        var id = reqBody.id;
        interfaceCall(TEMP_ID_HARD_CODED, function (error, msg) {
            if (error) {
                console.log(error)
                return createResponse.error(error, function (res) {
                    response.send(res);
                })
            }
            createResponseCall(msg, function (res) {
                response.send(res);
            })
        });
}

// Define responses
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