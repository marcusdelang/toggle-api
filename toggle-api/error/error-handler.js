var errorCodes = require('./error-codes');
var createResponse = require('./../server/create-response');

function handleErrorResponse(error, response) {
    switch (error.code) {
        case errorCodes.sentBadRequest:
            return createResponse.serverError('SERVER ERROR: Api server was not able to send valid request to toggle-io device.', response);
        case errorCodes.receivedBadRequest:
            return createResponse.badRequest('SEVER ERROR: Api received bad request.', response);
        case errorCodes.invalidIp:
            return createResponse.badRequest('BAD REQUEST: Api received invalid IP from client.', response)
        case errorCodes.server:
            return createResponse.serverError('SERVER ERROR: Something went wrong in the server. ' + error.message, response);
        case errorCodes.database:
            return createResponse.serverError('SERVER ERROR: Database error: ' + error.message, response);
        case errorCodes.errorAtReceiver:
            return createResponse.serverError('SERVER ERROR: toggle-io device had internal error.', response);
        default:
            return createResponse.serverError('SERVER ERROR: The api server could not fulfill the request due to an unknown error. Contact support.', response)
    }
}

module.exports = handleErrorResponse;