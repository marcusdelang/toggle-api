var fs = require('fs');
var pathToDatabase = __dirname + '/devices.json';
var errorCodes = require('./../error').errorCodes;
var devices;

function createError(error, message, code) {
    let errorObject = {
        message: message,
        error: error,
        code: code
    }
    return errorObject;
}

var getIp = function (deviceToken, callback) {
    fs.readFile(__dirname + '/devices.json', function (error, data) {
        if (error) {
            return callback(createError(error, 'Could not read database', errorCodes.database), null);
        }
        devices = JSON.parse(data);
        let ip = devices[deviceToken];
        if (!ip) {
            return callback(null, null)
        }
        return callback(null, ip);
    });
}

function setIp(deviceToken, ip, callback) {
    fs.readFile(pathToDatabase, function (error, data) {
        if (error) {
            return callback(createError(error, 'Could not read database', errorCodes.database), null);
        }
        devices = JSON.parse(data);
        devices[deviceToken] = ip;
        fs.writeFile(pathToDatabase, JSON.stringify(devices, null, 2), function (error) {
            if (error) {
                return callback(createError(error, 'Could not write to database', errorCodes.database), null);
            }
            return callback(null, 'Ip updated');
        })
    });
}

function updateIp(deviceToken, ip, callback) {
    setIp(deviceToken, ip, callback);
}


module.exports = {
    getIp: getIp,
    setIp: setIp,
    updateIp: updateIp
}
