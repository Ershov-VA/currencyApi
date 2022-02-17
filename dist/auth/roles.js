"use strict";
exports.__esModule = true;
exports.viewer = exports.admin = void 0;
var auth_1 = require("../interfaces/enum/auth");
var http_1 = require("../interfaces/enum/http");
function admin(req, res, next) {
    if (!req.user.roles.includes("admin"))
        return res.status(http_1.HTTP.ACCESS_DENIED).send({ status: auth_1.AUTH.ACCESS_DENIED });
    next();
}
exports.admin = admin;
function viewer(req, res, next) {
    if (!req.user.roles.includes("viewer"))
        return res.status(http_1.HTTP.ACCESS_DENIED).send({ status: auth_1.AUTH.ACCESS_DENIED });
    next();
}
exports.viewer = viewer;
