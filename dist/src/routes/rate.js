"use strict";
exports.__esModule = true;
var express = require('express');
var auth_1 = require("../auth");
var router = express.Router();
var roles_1 = require("../auth/roles");
var controllers_1 = require("../../controllers");
router.get('/', [auth_1["default"], roles_1.viewer], function (req, res) {
    (0, controllers_1.CurrencyController)().getTodayCurrency(req, res);
});
router.get('/date/:date', [auth_1["default"], roles_1.viewer], function (req, res) {
    (0, controllers_1.CurrencyController)().getRateByDate(req, res);
});
router.get('/pair/:pairOne/:pairTwo', [auth_1["default"], roles_1.viewer], function (req, res) {
    (0, controllers_1.CurrencyController)().getRateByPair(req, res);
});
exports["default"] = router;
