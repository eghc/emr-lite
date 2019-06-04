const express = require("express");
const app = express();
//const bodyParser = require('body-parser');
const path = require('path');

//const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/build')));

routeConfig.init(app);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


module.exports = app;
