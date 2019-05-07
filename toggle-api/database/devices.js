var fs = require('fs');
var pathToDatabase = __dirname + '/devices.json';
var devices;


var getIp = function (id, callback) {
    fs.readFile(__dirname + '/devices.json', function (error, data) {
        devices = JSON.parse(data);
        var ip = devices[id];
        if (!ip) {
            var error = "ERROR: Ip could not be found for this id";
            return callback(error, null);
        }
        callback(null, devices[id]);
    });
}

function setIp(id, ip, callback) {
    fs.readFile(pathToDatabase, function (error, data) {
        devices = JSON.parse(data);
        devices[id] = ip;
        fs.writeFile(pathToDatabase, JSON.stringify(devices, null, 2), function (error) {
            if (error) {
                console.log(error);
                return callback(error, null);
            }
            callback(null, 'Ip updated');
        })
    });
}

function updateIp(id, ip, callback) {
    setIp(id, ip, callback);
}


module.exports = {
    getIp: getIp,
    setIp: setIp,
    updateIp: updateIp
}
