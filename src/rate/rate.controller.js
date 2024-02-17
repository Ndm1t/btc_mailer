"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateController = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var RateController = function () {
    var _classDecorators = [(0, common_1.Controller)('/rate')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getCurrency_decorators;
    var _sendCurrentRate_decorators;
    var RateController = _classThis = /** @class */ (function () {
        function RateController_1(exchangeGauge, httpService, rateService, emailService, mailService) {
            this.exchangeGauge = (__runInitializers(this, _instanceExtraInitializers), exchangeGauge);
            this.httpService = httpService;
            this.rateService = rateService;
            this.emailService = emailService;
            this.mailService = mailService;
        }
        RateController_1.prototype.getRateFromApi = function () {
            return __awaiter(this, void 0, void 0, function () {
                var btcToUahData, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService
                                    .get('https://btc-trade.com.ua/api/ticker/btc_uah')
                                    .pipe())];
                        case 1:
                            btcToUahData = _a.sent();
                            return [2 /*return*/, parseInt(btcToUahData.data.btc_uah.sell)];
                        case 2:
                            e_1 = _a.sent();
                            throw new common_1.HttpException({
                                status: common_1.HttpStatus.BAD_REQUEST,
                                error: 'Invalid status value',
                            }, common_1.HttpStatus.BAD_REQUEST, { cause: 'Invalid status value' });
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        RateController_1.prototype.getCurrency = function () {
            return __awaiter(this, void 0, void 0, function () {
                var currentRate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getRateFromApi()];
                        case 1:
                            currentRate = _a.sent();
                            return [4 /*yield*/, this.rateService.createOrUpdate({
                                    currentRate: currentRate,
                                })];
                        case 2:
                            _a.sent();
                            this.exchangeGauge.set(currentRate);
                            return [2 /*return*/, currentRate];
                    }
                });
            });
        };
        RateController_1.prototype.sendCurrentRate = function () {
            return __awaiter(this, void 0, void 0, function () {
                var currentRate, emails, sentEmails;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getRateFromApi()];
                        case 1:
                            currentRate = _a.sent();
                            return [4 /*yield*/, this.emailService.findSubscribed()];
                        case 2:
                            emails = _a.sent();
                            return [4 /*yield*/, this.mailService.sendSubscribersCurrencyRate(emails, currentRate)];
                        case 3:
                            sentEmails = _a.sent();
                            return [2 /*return*/, {
                                    message: 'Rate sent to active subscriptions',
                                    emails: sentEmails,
                                }];
                    }
                });
            });
        };
        return RateController_1;
    }());
    __setFunctionName(_classThis, "RateController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getCurrency_decorators = [(0, common_1.Get)()];
        _sendCurrentRate_decorators = [(0, common_1.Post)()];
        __esDecorate(_classThis, null, _getCurrency_decorators, { kind: "method", name: "getCurrency", static: false, private: false, access: { has: function (obj) { return "getCurrency" in obj; }, get: function (obj) { return obj.getCurrency; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendCurrentRate_decorators, { kind: "method", name: "sendCurrentRate", static: false, private: false, access: { has: function (obj) { return "sendCurrentRate" in obj; }, get: function (obj) { return obj.sendCurrentRate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RateController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RateController = _classThis;
}();
exports.RateController = RateController;