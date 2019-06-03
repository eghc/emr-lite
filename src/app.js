const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");

appConfig.init();
routeConfig.init(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join('./client/build')));
app.get('*', function(req, res) {    res.sendFile(path.join('./client/build', 'index.html'));  });

module.exports = app;
