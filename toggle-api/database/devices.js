var fs = require('fs');
var devices, callback;

fs.readFile('./devices.json', function (error, data){
    if (error) {
        return console.log(error);
    }
    if (typeof callback == 'function'){
        devices = JSON.parse(data);
        callback(devices);
    }
});

module.exports = function (cb) {
    if (typeof devices != 'undefined'){
        cb(devices); // If devices is already define, I don't wait.
    } else {
        callback = cb;
    }
}
