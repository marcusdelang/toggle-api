
var responses = {
    on: function (msg, cb) {
        var response = msg;

        cb(response);
    },

    off: function (msg, cb) {
        var response = msg;

        cb(response);
    },

    error: function (msg, cb) {
        var response = msg;

        cb(response);
    },
}

module.exports = responses;