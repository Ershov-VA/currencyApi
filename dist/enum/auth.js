"use strict";
exports.__esModule = true;
exports.ROLES = exports.AUTH = void 0;
var AUTH;
(function (AUTH) {
    AUTH["SUCCESS"] = "success";
    AUTH["WRONG_USERNAME"] = "wrong username";
    AUTH["WRONG_PASSWORD"] = "wrong password";
    AUTH["ACCESS_DENIED"] = "access denied";
    AUTH["TOKEN_EXPIRED"] = "token expired";
})(AUTH = exports.AUTH || (exports.AUTH = {}));
var ROLES;
(function (ROLES) {
    ROLES["ADMIN"] = "admin";
    ROLES["VIEWER"] = "viewer";
})(ROLES = exports.ROLES || (exports.ROLES = {}));
