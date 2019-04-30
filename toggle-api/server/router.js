var handleRequest = require('./handle-request');

function setRoutes(app) {
    app.get("/api/power/on", handleRequest.powerOn);
    app.get("/api/power/off", handleRequest.powerOff);
    app.get("api/connection/status", handleRequest.connectionStatus);
}

module.exports = setRoutes;