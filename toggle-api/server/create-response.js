// Defines the HTTP response with the message received from the application.

function sendResponse(message, toSender) {
    toSender.send(message);
}

var responses = {
    on: function (message, toSender) {
        // Manipulate response
        console.log(200 + ' ' + message)
        toSender.status(200);
        sendResponse(message, toSender);
    },

    off: function (message, toSender) {
        // Manipulate response
        console.log(200 + ' ' +message)
        toSender.status(200);
        sendResponse(message, toSender);
    },
    
    register: function (message, toSender) {
        // Manipulate response
        console.log(200 + ' ' +message)
        toSender.status(200);
        toSender.send(message);
    },

    registerNewDevice: function (message, deviceToken, toSender) {
        var json = {
            "token": deviceToken,
            "message": message
        };
        console.log(200 + ' ' + JSON.stringify(json));
        toSender.status(200);
        toSender.json(json);
    },

    status: function (json, toSender) {
        // Manipulate response
        console.log(200 + ' ' + JSON.stringify(json));
        toSender.status(200);
        toSender.json(json);
    },

    badRequest: function (message, toSender) {
        // Manipulate response
        console.log(400 + ' ' +message)
        toSender.status(400)
        sendResponse(message, toSender);
    },

    serverError: function (message, toSender) {
        // Manipulate response
        console.log(500 + ' ' +message)
        toSender.status(500);
        sendResponse(message, toSender);
    },

    isDevice: function (message, toSender) {
        // Manipulate response
        console.log(200 + ' ' +message)
        toSender.status(200);
        sendResponse(message, toSender);
    },

    notFound: function (message, toSender) {
        // Manipulate response
        console.log(400 + ' ' +message)
        toSender.status(404);
        sendResponse(message, toSender);
    }
}

module.exports = responses;