"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    username: { type: String },
    password: { type: String },
    roles: [{ type: String }]
});
exports["default"] = (0, mongoose_1.model)('User', schema);
