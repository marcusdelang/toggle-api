var assert = require('assert')
var fs = require('fs');
var db = require('./../integration/database');

describe('api actions, on', () => {
    var testDatabase = {
        devices: {
            1: '1.1.1.1',
            2: '2.2.2.2',
            3: '3.3.3.3'
        }
    }
    fs.writeFile('./test-database.json', JSON.stringify(testDatabase), function (err, data) {
        if (err) {
            throw err;
        }
        var database = new db('./test-database.json');
        var expected = '1.1.1.1';
        var actual = database.getIp(1);
        assert.equal(actual, expected);
    });
});