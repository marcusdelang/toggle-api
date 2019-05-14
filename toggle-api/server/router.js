var handleRequest = require('./handle-request');
var state = 'on';
var counter = 0;

// Define routes for API and specify action
function setRoutes(app) {
    app.post("/api/device/register", handleRequest.registerDevice);
    app.post("/api/device/update", handleRequest.updateDeviceIp);
    app.post("/api/isDevice", handleRequest.isDevice);
    app.post("/api/power/on", handleRequest.powerOn);
    app.post("/api/power/off", handleRequest.powerOff);
    app.post("/api/status", handleRequest.status);

    /* Code for testing without toggle-io
    app.post('/api/power/on', function (req, res) {
        counter++;
        state = "on";
        console.log(counter);
        res.json({"status_power" : state});
    });
    app.post('/api/power/off', function (req, res) {
        counter++;
        state = "off";
        console.log(counter);
        res.json({"status_power" : state});
    });
    app.post("/api/status", function (req, res) {
        res.json({ "status_power": "off" });
        console.log("200")
    });
    */
}

module.exports = setRoutes;