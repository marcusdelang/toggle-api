var devices = require('./../database').devices;
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');

describe('devices database', function () {

    before(function (done) {
        try {
            var devicesJson = fs.readFileSync(__dirname + '/../database/devices.json')
        } catch (e) {
            console.log('Could not read database file.');
            return done(e);
        }
        try {
            var devicesObj = JSON.parse(devicesJson);
        } catch (e) {
            console.log('Could not parse devices json');
            return done(e);
        }
        var testIps = {
            'test_ip1': 'test ip 1',
            'test_ip2': 'test ip 2'
        }
        var testDB = JSON.stringify(Object.assign(testIps, devicesObj), null, 2);
        try {
            fs.writeFileSync(__dirname + '/../database/devices.json', testDB);
        } catch (e) {
            console.log('Could not write to devices.json');
            return done(e);
        }
        done();
    });

    after(function (done) {
        try {
            var devicesJson = fs.readFileSync(__dirname + '/../database/devices.json')
        } catch (e) {
            console.log('Could not read devices.json');
            return done(e);
        }
        try {
            var devicesObj = JSON.parse(devicesJson);
        } catch (e) {
            console.log('Could not parse devices as json');
            return done(e);
        }
        delete devicesObj['test_ip1']
        delete devicesObj['test_ip2']
        fs.writeFileSync(__dirname + '/../database/devices.json', JSON.stringify(devicesObj, null, 2));
        done();

    });

    it('should return a string on lookup', function (done) {
        devices.getIp('test_ip1', function (error, ip) {
            expect(typeof ip).to.be.equal('string');
            done();
        });
    });

    it('should lookup correct ip', function (done) {
        devices.getIp('test_ip1', function (error, ip) {
            expect(ip).to.be.equal('test ip 1');
            devices.getIp('test_ip2', function (error, ip) {
                expect(ip).to.be.equal('test ip 2');
                done();
            });
        });
    });

});