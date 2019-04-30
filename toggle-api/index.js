var server = require('./server/server');
var fs = require('fs');

fs.readFile('./server-config.json', function (err, data) {
    if (err) {
        return console.log('ERROR READING CONFIG FILE: ' + err);
    }
    var config = JSON.parse(data);
    server.start(config);
});
