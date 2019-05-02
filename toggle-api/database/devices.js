var fs = require('fs');
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


/*
function getIp(id, callback) {
    callback(null, '130.229.167.163');
}
*/

module.exports = {
    getIp: getIp
}
