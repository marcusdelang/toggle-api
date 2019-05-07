// Defines the HTTP response with the message received from the application.

function sendResponse(message, toSender) {
    toSender.send(message);
}

var responses = {
    on: function (message, toSender) {
        // Manipulate response
        toSender.status(200);
        sendResponse(message, toSender);
    },

    off: function (message, toSender) {
        // Manipulate response
        toSender.status(200);
        sendResponse(message, toSender);
    },
    
    register: function (message, toSender) {
        // Manipulate response
        toSender.status(200);
        toSender.send(message);
    },

    registerNewDevice: function (message, id, toSender) {
        var json = { "id": id };
        toSender.status(200);
        toSender.json(json);
    },

    status: function (message, toSender) {
        // Manipulate response
        toSender.status(200);
        toSender.send(message);
    },

    badRequest: function (message, toSender) {
        // Manipulate response
        toSender.status(400)
        sendResponse(message, toSender);
    },

    serverError: function (message, toSender) {
        // Manipulate response
        toSender.status(500);
        sendResponse(message, toSender);
    },

    isDevice: function (message, toSender) {
        // Manipulate response
        toSender.status(200);
        sendResponse(message, toSender);
    },

    notFound: function (message, toSender) {
        // Manipulate response
        toSender.status(404);
        sendResponse(message, toSender);
    }
}

module.exports = responses;