var handleRequest = require('./handle-request');

// Define routes for API and specify action
function setRoutes(app) {
    app.post("/api/device/register", handleRequest.registerDevice);
    app.post("/api/device/update", handleRequest.updateDeviceIp);
    app.post("/api/isDevice", handleRequest.isDevice);
    app.post("/api/power/on", handleRequest.powerOn);
    app.post("/api/power/off", handleRequest.powerOff);
    app.post("/api/status", handleRequest.status);
    /*app.post("/api/status", function (req, res) {
        res.json({ "status_power": "on" });
    });*/

}

module.exports = setRoutes;