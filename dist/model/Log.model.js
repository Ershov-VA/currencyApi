"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    date: { type: Date },
    queryType: { type: String },
    ip: { type: String }
});
exports["default"] = (0, mongoose_1.model)('Log', schema);
