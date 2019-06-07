const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
//const cors = require('cors');

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/build')));

//app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

module.exports = app;

const routeConfig = require("./config/route-config.js");
routeConfig.init(app);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
