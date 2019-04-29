var req = require('request');

function setRoutes(app) {
    app.get("/toggle-api/helloworld", function (request, response) {
        var jsonTest = {
            firstName: "Hello",
            lastName: "Worldsson",
            announcement: "This is a JSON test, no need to worry, just a test. :) ."
        }
        response.send(JSON.stringify(jsonTest))
    })

    app.get("/api/turnmeon", function (request, response) {
        req.get('http://130.229.144.157/turnon', function () {

        });
        response.send("OK");
    });

    app.post("/toggle-api/post-test", function (request, response) {
        var name = request.body.name;
        response.send(name);
    });
}



module.exports = setRoutes;