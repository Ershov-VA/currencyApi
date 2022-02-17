"use strict";
exports.__esModule = true;
var express = require('express');
var auth_1 = require("../auth");
var router = express.Router();
var roles_1 = require("../auth/roles");
var controllers_1 = require("../controllers");
router.get('/', [auth_1["default"], roles_1.viewer], function (req, res) {
    (0, controllers_1.RateController)().getTodayRate(req, res);
});
router.get('/range/:range', [auth_1["default"], roles_1.viewer], function (req, res) {
    (0, controllers_1.RateController)().getRatePerRange(req, res);
});
router.get('/date/:date', [auth_1["default"], roles_1.viewer], function (req, res) {
    (0, controllers_1.RateController)().getRateByDate(req, res);
});
router.get('/pair/:pairOne/:pairTwo', [auth_1["default"], roles_1.viewer], function (req, res) {
    (0, controllers_1.RateController)().getRateByPair(req, res);
});
router["delete"]('/:id', [auth_1["default"], roles_1.admin], function (req, res) {
    (0, controllers_1.RateController)().remove(req, res);
});
exports["default"] = router;
