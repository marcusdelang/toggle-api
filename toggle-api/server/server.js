var express = require("express");
var bodyParser = require('body-parser');
var router = require('./router');

function start(config, callback) {
  var app = express();

  // Server parsing-config
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // Specify API routes (endpoints)
  router(app);

  // Start server
  var port = process.env.PORT || config.port;
  
  if (callback) {
    callback(app);
  }

  return app.listen(port, function () {
    console.log("Server is running. If local, try http://localhost:" + port);
  });
}

module.exports.start = start;


