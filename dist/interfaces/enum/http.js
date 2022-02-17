"use strict";
exports.__esModule = true;
exports.TYPES = exports.HTTP = void 0;
var HTTP;
(function (HTTP) {
    HTTP[HTTP["SUCCESS"] = 200] = "SUCCESS";
    HTTP[HTTP["CREATED"] = 201] = "CREATED";
    HTTP[HTTP["ACCEPTED"] = 202] = "ACCEPTED";
    HTTP[HTTP["REDIRECT"] = 301] = "REDIRECT";
    HTTP[HTTP["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP[HTTP["ACCESS_DENIED"] = 401] = "ACCESS_DENIED";
    HTTP[HTTP["FORBIDDEN"] = 403] = "FORBIDDEN";
    HTTP[HTTP["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTP[HTTP["NOT_ALLOWED"] = 405] = "NOT_ALLOWED";
    HTTP[HTTP["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(HTTP = exports.HTTP || (exports.HTTP = {}));
var TYPES;
(function (TYPES) {
    TYPES["GET"] = "GET";
    TYPES["POST"] = "POST";
    TYPES["DELETE"] = "GELETE";
})(TYPES = exports.TYPES || (exports.TYPES = {}));
