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
router["delete"]('/:id', [auth_1["default"], roles_1.admin], function (req, res) {
    (0, controllers_1.CurrencyController)().remove(req, res);
});
exports["default"] = router;
