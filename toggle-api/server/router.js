var handleRequest = require('./handle-request');

// Define routes for API and specify action
function setRoutes(app) {
    app.post("/api/register", handleRequest.register);
    app.post("/api/isDevice", handleRequest.isDevice);
    app.post("/api/power/on", handleRequest.powerOn);
    app.post("/api/power/off", handleRequest.powerOff);
    app.post("/api/status", handleRequest.status);
}

module.exports = setRoutes;