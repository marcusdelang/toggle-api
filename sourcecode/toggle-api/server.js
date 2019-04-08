var express = require("express");
var app = express();
var cfenv = require("cfenv");
const req = require('request')
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var cloudant, mydb;


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


// load local VCAP configuration and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

// Load the Cloudant library.
var Cloudant = require('@cloudant/cloudant');
if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/cloudant/)) {

  // Initialize database with credentials
  if (appEnv.services['cloudantNoSQLDB']) {
    // CF service named 'cloudantNoSQLDB'
    cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
  } else {
     // user-provided service with 'cloudant' in its name
     cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
  }
} else if (process.env.CLOUDANT_URL){
  cloudant = Cloudant(process.env.CLOUDANT_URL);
}
if(cloudant) {
  //database name
  var dbName = 'mydb';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  mydb = cloudant.db.use(dbName);
}

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("Server is running. If local, try http://localhost:" + port);
});