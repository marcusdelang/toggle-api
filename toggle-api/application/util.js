
function handleCallback(error, message, callback) {
    if (error) {
        return callback(error, null);
    }
    return callback(null, message);
}

function callToggle(ip, call, callback) {
    call(ip, function (error, message) {
        handleCallback(error, message, callback)
    });
}

function makeToken(length, callback) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?!';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    callback(result);
}

module.exports = {
    handleCallback: handleCallback,
    callToggle: callToggle,
    makeToken: makeToken
}