"use strict";
exports.__esModule = true;
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var scheduler_1 = require("./helpers/scheduler");
var routes_1 = require("./routes");
var config_1 = require("./config");
var install_1 = require("./install");
var app = express();
app.use(cors());
app.use(express.json());
app.options('*', cors()); // разрешение кросс-доменных запросов
app.use('/', routes_1["default"].Rate);
app.use('/auth', routes_1["default"].Auth);
app.use('/user', routes_1["default"].User);
app.use('/rate', routes_1["default"].Rate);
app.use('/log', routes_1["default"].Log);
mongoose.connect('mongodb://127.0.0.1/CurrencyAPI');
(0, install_1.install)(); // Если первоначальный запуск, то добавится пользователь admin - admin и создадутся случайные котировки по тикерам за 7 дней
app.listen(config_1.PORT, function (err) {
    if (err)
        return console.log("error start port");
    console.log("server start on ".concat(config_1.PORT));
    scheduler_1.job; // запуск назначенного задания получения котировок в 12:00
});
