"use strict";
exports.__esModule = true;
exports.job = void 0;
var _1 = require(".");
var controllers_1 = require("../controllers");
var schedule = require('node-schedule');
exports.job = schedule.scheduleJob({ hour: 12 }, function () {
    (0, controllers_1.CurrencyController)().createLatestCurrency((0, _1.getCurrentDate)());
    console.log('Получены новые котировки');
});
