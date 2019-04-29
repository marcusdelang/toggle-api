var express = require("express");
var bodyParser = require('body-parser');
var req = require('request')

var app = express();

// Set up server configuration
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Routing
app.get("/toggle-api/helloworld", function(request, response) {
  var jsonTest = {
    firstName : "Hello",
    lastName : "Worldsson",
    announcement : "This is a JSON test, no need to worry, just a test. :) ."
  }
  response.send(JSON.stringify(jsonTest))
})

app.get("/api/turnmeon", function(request, response) {
  req.get('http://130.229.144.157/turnon', function(){
    
  });
  response.send("OK");
});

app.post("/toggle-api/post-test", function(request, response) {
  var name = request.body.name;
  response.send(name);
});

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("Server is running. If local, try http://localhost:" + port);
});