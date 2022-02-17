"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var auth_1 = require("../interfaces/enum/auth");
var http_1 = require("../interfaces/enum/http");
function default_1(req, res, next) {
    var token = req.query.token;
    if (!token)
        return res.status(http_1.HTTP.ACCESS_DENIED)
            .send({ status: auth_1.AUTH.ACCESS_DENIED });
    try {
        var decoded = jwt.verify(token, 'jwtPrivateKey');
        req.user = decoded;
    }
    catch (error) {
        console.log(error);
        return res.status(http_1.HTTP.ACCESS_DENIED)
            .send({ status: auth_1.AUTH.TOKEN_EXPIRED });
    }
    next();
}
exports["default"] = default_1;
