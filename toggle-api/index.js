var server = require('./server/server');
var fs = require('fs');
var config;

initConfig(function () {
    initDatabase(function () {
        server.start(config);
    });
});

function initConfig(callback) {
    fs.readFile('./server-config.json', function (error, data) {
        if (error) {
            return console.log('ERROR READING CONFIG FILE: ' + err);
        }
        config = JSON.parse(data);
        callback();
    });
}

function initDatabase(callback) {
    fs.readFile(config.database_path, function (error, data) {
        if (error) {
            return createDatabase(function () {
                initDatabase(callback)
            });
        }
        if (data.length === 0) {
            let jsonObj = {};
            fs.writeFile(config.database_path, JSON.stringify(jsonObj), function (error) {
                if (error) {
                    return console.log('Could not write database file.');
                }
                return callback();
            });
        } else {
            return callback();
        }
    });
}

function createDatabase(callback) {
    fs.writeFile(config.database_path, '', function (error) {
        if (error) {
            return console.log('Could not create database file: ' + error);
        }
        return callback();
    });
}
