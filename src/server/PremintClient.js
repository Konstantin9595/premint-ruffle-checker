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
var types_1 = require("./types");
var node_html_parser_1 = require("node-html-parser");
var initCycleTLS = require('cycletls');
var PremintClient = /** @class */ (function () {
    function PremintClient() {
        this.tlsInstance = initCycleTLS();
    }
    PremintClient.prototype.checkRuffleStatus = function (url, requestData) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkRegister(url, requestData)];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    PremintClient.prototype.checkRuffleUrl = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tlsInstance];
                    case 1: return [4 /*yield*/, (_a.sent()).get("".concat(url), {
                            ja3: '771,4865-4867-4866-49195-49199-52393-52392-49196-49200-49162-49161-49171-49172-51-57-47-53-10,0-23-65281-10-11-35-16-5-51-43-13-45-28-21,29-23-24-25-256-257,0',
                            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
                            headers: {
                                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                                'accept-language': 'en-US,en;q=0.5',
                                'accept-encoding': 'gzip, deflate, br',
                                'referer': url,
                                'origin': 'https://www.premint.xyz',
                                'dnt': '1',
                                'content-type': 'application/x-www-form-urlencoded',
                                'upgrade-insecure-requests': '1',
                                'sec-fetch-dest': 'document',
                                'sec-fetch-mode': 'navigate',
                                'sec-fetch-site': 'same-origin',
                                'sec-fetch-user': '?1',
                                'te': 'trailers'
                            },
                            cookies: {
                                'csrftoken': "ECKYBHr2BExekhepOlB1mQInocyipOCGzvcXZhn8kLpxBB3bMhE7Wyj85plPz3ar"
                            }
                        })];
                    case 2:
                        status = (_a.sent()).status;
                        if (status !== 200) {
                            return [2 /*return*/, { responseStatus: status, url: url }];
                        }
                        return [2 /*return*/, { responseStatus: status, url: url }];
                }
            });
        });
    };
    PremintClient.prototype.checkRegister = function (url, requestData) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, proxy, reqUrl, _a, status, body, dom, headingList, headingLength, heading, registerStatusData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wallet = requestData.wallet, proxy = requestData.proxy;
                        reqUrl = url[url.length - 1] === '/' ? "".concat(url, "verify/?wallet=").concat(wallet) : "".concat(url, "/verify/?wallet=").concat(wallet);
                        return [4 /*yield*/, this.tlsInstance];
                    case 1: return [4 /*yield*/, (_b.sent()).get(reqUrl, {
                            ja3: '771,4865-4867-4866-49195-49199-52393-52392-49196-49200-49162-49161-49171-49172-51-57-47-53-10,0-23-65281-10-11-35-16-5-51-43-13-45-28-21,29-23-24-25-256-257,0',
                            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
                            headers: {
                                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                                'accept-language': 'en-US,en;q=0.5',
                                'accept-encoding': 'gzip, deflate, br',
                                'referer': url,
                                'origin': 'https://www.premint.xyz',
                                'dnt': '1',
                                'content-type': 'application/x-www-form-urlencoded',
                                'upgrade-insecure-requests': '1',
                                'sec-fetch-dest': 'document',
                                'sec-fetch-mode': 'navigate',
                                'sec-fetch-site': 'same-origin',
                                'sec-fetch-user': '?1',
                                'te': 'trailers'
                            },
                            cookies: {
                                'csrftoken': "ECKYBHr2BExekhepOlB1mQInocyipOCGzvcXZhn8kLpxBB3bMhE7Wyj85plPz3ar"
                            },
                            proxy: proxy
                            //disableRedirect: true
                        })];
                    case 2:
                        _a = _b.sent(), status = _a.status, body = _a.body;
                        if (status !== 200) {
                            return [2 /*return*/, { responseStatus: status, isRegister: false, message: '', url: url, proxy: proxy, registerWallet: requestData.wallet }];
                        }
                        dom = (0, node_html_parser_1.parse)(body);
                        headingList = dom.querySelectorAll("section .card-body .heading");
                        headingLength = headingList.length;
                        heading = '';
                        try {
                            heading = headingList[headingLength - 1].innerText;
                        }
                        catch (_c) {
                            heading = '';
                        }
                        registerStatusData = this.extractStatusFromBody(heading);
                        return [2 /*return*/, { responseStatus: status, isRegister: registerStatusData.isRegister, message: registerStatusData.message, url: url, proxy: proxy, registerWallet: requestData.wallet }];
                }
            });
        });
    };
    PremintClient.prototype.extractStatusFromBody = function (message) {
        if (!message) {
            return { message: "Is not a valid ETH address", isRegister: true, ruffleStatus: types_1.RuffleStatuses.UNREGISTRED };
        }
        var msg = message.toLowerCase();
        var messageList = [
            { message: "Allowlist", isRegister: true, ruffleStatus: types_1.RuffleStatuses.ALLOWLIST_MINT },
            { message: "Waitlist", isRegister: true, ruffleStatus: types_1.RuffleStatuses.PUBLIC_MINT },
            { message: "You aren't registered", isRegister: false, ruffleStatus: types_1.RuffleStatuses.UNREGISTRED },
            { message: "You are registered", isRegister: true, ruffleStatus: types_1.RuffleStatuses.PENDING },
            { message: "You were not selected", isRegister: true, ruffleStatus: types_1.RuffleStatuses.UNSELECTED },
            { message: "You were selected", isRegister: true, ruffleStatus: types_1.RuffleStatuses.ALLOWLIST_MINT }
        ];
        var matches = messageList.filter(function (el) { return msg.match(el.message.toLowerCase()) !== null; });
        if (matches.length <= 0) {
            throw new Error('No match found in response text');
        }
        return matches[0];
    };
    PremintClient.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return PremintClient;
}());
exports["default"] = PremintClient;
