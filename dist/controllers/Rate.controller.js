"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var config_1 = require("../config");
var http_1 = require("../interfaces/enum/http");
var helpers_1 = require("../helpers");
var Rate_model_1 = require("../model/Rate.model");
var _1 = require(".");
var http_2 = require("../interfaces/enum/http");
var RateController = function () { return ({
    getRateByPair: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pairOne_1, pairTwo_1, rateToday, ratePairOne, ratePairTwo, rate, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.params, pairOne_1 = _a.pairOne, pairTwo_1 = _a.pairTwo;
                        if (!config_1.CURRENCY_TICKETS.includes(pairOne_1.toUpperCase()) || !config_1.CURRENCY_TICKETS.includes(pairTwo_1.toUpperCase()))
                            return [2 /*return*/, res.status(http_1.HTTP.BAD_REQUEST).send({ status: 'Неправильно указаны пары валют. Возможные варианты ' + config_1.CURRENCY_TICKETS })];
                        return [4 /*yield*/, this.getTodayRateLoc()];
                    case 1:
                        rateToday = _b.sent();
                        ratePairOne = rateToday.rates.filter(function (item) { return item.ticker === pairOne_1.toUpperCase(); });
                        ratePairTwo = rateToday.rates.filter(function (item) { return item.ticker === pairTwo_1.toUpperCase(); });
                        rate = ratePairTwo[0].cost / ratePairOne[0].cost;
                        (0, _1.LogController)().logging(req.connection, http_2.TYPES.GET);
                        return [2 /*return*/, res.status(http_1.HTTP.SUCCESS).send({ rate: rate })];
                    case 2:
                        error_1 = _b.sent();
                        return [2 /*return*/, res.status(http_1.HTTP.SERVER_ERROR).send(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    getRateByDate: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var date, ratesByDate, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        date = req.params.date;
                        if (!(0, helpers_1.isDateValid)(date))
                            return [2 /*return*/, res.status(http_1.HTTP.BAD_REQUEST).send({ status: "Date is wrong" })];
                        return [4 /*yield*/, Rate_model_1["default"].findOne({ date: date })];
                    case 1:
                        ratesByDate = _a.sent();
                        (0, _1.LogController)().logging(req.connection, http_2.TYPES.GET);
                        if (ratesByDate)
                            return [2 /*return*/, res.status(http_1.HTTP.SUCCESS).json(ratesByDate)];
                        return [2 /*return*/, res.status(http_1.HTTP.SUCCESS).json({ status: "not found" })];
                    case 2:
                        error_2 = _a.sent();
                        res.status(http_1.HTTP.SERVER_ERROR).send(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    getRatePerRange: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var range, rangeData, date, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        range = req.params.range;
                        rangeData = [];
                        date = new Date();
                        if (!(range.toLowerCase() === 'week')) return [3 /*break*/, 2];
                        date.setDate(date.getDate() - 7);
                        return [4 /*yield*/, Rate_model_1["default"].find({ created_on: {
                                    $gte: new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()),
                                    $lt: new Date()
                                } })];
                    case 1:
                        rangeData = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(range.toLocaleLowerCase() === 'month')) return [3 /*break*/, 4];
                        date.setDate(date.getDate() - 31);
                        return [4 /*yield*/, Rate_model_1["default"].find({ created_on: {
                                    $gte: new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()),
                                    $lt: new Date()
                                } })];
                    case 3:
                        rangeData = _a.sent();
                        _a.label = 4;
                    case 4:
                        (0, _1.LogController)().logging(req.connection, http_2.TYPES.GET);
                        if (rangeData.length > 0)
                            return [2 /*return*/, res.status(http_1.HTTP.SUCCESS).json(rangeData)];
                        return [2 /*return*/, res.status(http_1.HTTP.SUCCESS).json({ status: "not found" })];
                    case 5:
                        error_3 = _a.sent();
                        res.status(http_1.HTTP.SERVER_ERROR).send(error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    getTodayRateLoc: function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentDate, currentCurrency, newItem, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        currentDate = (0, helpers_1.getCurrentDate)();
                        return [4 /*yield*/, Rate_model_1["default"].findOne({ date: currentDate })];
                    case 1:
                        currentCurrency = _a.sent();
                        if (!currentCurrency) {
                            newItem = this.createLatestCurrency(currentDate);
                            return [2 /*return*/, newItem];
                        }
                        return [2 /*return*/, currentCurrency];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    getTodayRate: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var currentCurrency, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getTodayRateLoc()];
                    case 1:
                        currentCurrency = _a.sent();
                        (0, _1.LogController)().logging(req.connection, http_2.TYPES.GET);
                        return [2 /*return*/, res.status(http_1.HTTP.SUCCESS).send(currentCurrency)];
                    case 2:
                        error_5 = _a.sent();
                        if (res)
                            return [2 /*return*/, res.status(http_1.HTTP.SERVER_ERROR).send(error_5)];
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    createLatestCurrency: function (currentDate) {
        return __awaiter(this, void 0, void 0, function () {
            var fetchData_1, rates_1, item, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, helpers_1.fetchLatest)()];
                    case 1:
                        fetchData_1 = _a.sent();
                        rates_1 = [];
                        Object.keys(fetchData_1.rates).forEach(function (key) {
                            var cost = fetchData_1.rates;
                            rates_1.push({ ticker: key, cost: cost[key] });
                        });
                        item = Rate_model_1["default"].findOneAndReplace({ date: { $eq: currentDate } }, { date: currentDate, rates: rates_1 }, { upsert: true });
                        return [2 /*return*/, item];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    get: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var item, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        (0, _1.LogController)().logging(req.connection, http_2.TYPES.GET);
                        return [4 /*yield*/, Rate_model_1["default"].find()];
                    case 1:
                        item = _a.sent();
                        return [2 /*return*/, res.status(http_1.HTTP.SUCCESS).json(item)];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, res.status(http_1.HTTP.BAD_REQUEST).send(error_7)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    remove: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        (0, _1.LogController)().logging(req.connection, http_2.TYPES.DELETE);
                        return [4 /*yield*/, Rate_model_1["default"].findByIdAndDelete(id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(http_1.HTTP.SUCCESS)
                                .json({
                                status: 'ok'
                            })];
                    case 3:
                        error_8 = _a.sent();
                        res.status(http_1.HTTP.BAD_REQUEST).send(error_8);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    create: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body, item, newItem, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        body = req.body;
                        (0, _1.LogController)().logging(req.connection, http_2.TYPES.POST);
                        item = new Rate_model_1["default"](body);
                        return [4 /*yield*/, item.save()];
                    case 1:
                        newItem = _a.sent();
                        return [2 /*return*/, res.status(http_1.HTTP.CREATED).json(newItem)];
                    case 2:
                        error_9 = _a.sent();
                        return [2 /*return*/, res.status(http_1.HTTP.BAD_REQUEST).send(error_9)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
}); };
exports["default"] = RateController;
