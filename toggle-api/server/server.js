var express = require("express");
var bodyParser = require('body-parser');
var router = require('./router');

function start(config) {
  var app = express();

  // Server parsing-config
  app.use(express.json());
  app.use(express.urlencoded());

  // Specify API routes (endpoints)
  router(app);

  // Start server
  var port = process.env.PORT || config.port;
  app.listen(port, function () {
    console.log("Server is running. If local, try http://localhost:" + port);
  });
}

module.exports.start = start;


