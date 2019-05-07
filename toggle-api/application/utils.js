
function handleCallback(error, message, callback) {
    if (error) {
        console.log("Could not call toggles: " + error);
        return callback(error, null);
    }
    callback(null, message);
}

function callToggle(ip, call, callback) {
    call(ip, function (error, message) {
        handleCallback(error, message, callback)
    });
}

function makeId(length, callback) {
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
    makeId: makeId
}