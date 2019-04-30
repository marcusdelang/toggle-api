var express = require("express");
var bodyParser = require('body-parser');
var router = require('./router');

function start(config) {
  var app = express();

  // server config
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // set up routes (endpoints)
  router(app);

  var port = process.env.PORT || config.port;
  app.listen(port, function () {
    console.log("Server is running. If local, try http://localhost:" + port);
  });
}

module.exports.start = start;


