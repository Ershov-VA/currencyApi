"use strict";
exports.__esModule = true;
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var scheduler_1 = require("./services/scheduler");
var routes_1 = require("./routes");
var config_1 = require("./config");
var app = express();
app.use(cors());
app.use(express.json());
app.options('*', cors());
app.use('/auth', routes_1["default"].Auth);
app.use('/', routes_1["default"].Messages);
app.use('/ticket', routes_1["default"].Ticker);
app.use('/user', routes_1["default"].User);
app.use('/currency', routes_1["default"].Currency);
app.use('/rate', routes_1["default"].Rate);
mongoose.connect('mongodb://127.0.0.1/CurrencyDB');
app.listen(config_1.PORT, function (err) {
    if (err)
        return console.log("error start port");
    console.log("server start on ".concat(config_1.PORT));
    scheduler_1.job;
});
