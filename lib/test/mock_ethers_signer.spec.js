"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var abi_1 = require("@ethersproject/abi");
var utils_1 = require("../utils");
var mock_ethers_provider_1 = __importDefault(require("./mock_ethers_provider"));
var mock_ethers_signer_1 = __importDefault(require("./mock_ethers_signer"));
describe("MockEthersSigner tests suite", function () {
    var mockProvider = new mock_ethers_provider_1.default();
    var mockSigner = new mock_ethers_signer_1.default(mockProvider);
    beforeEach(function () {
        mockSigner.clear();
        mockProvider.clear();
    });
    it("should return the correct address", function () { return __awaiter(void 0, void 0, void 0, function () {
        var CASES, _i, CASES_1, addr, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    CASES = [
                        (0, utils_1.createAddress)("0xf00d"),
                        (0, utils_1.createAddress)("0xdead"),
                        (0, utils_1.createAddress)("0xabcdef"),
                        (0, utils_1.createAddress)("0xe0a"),
                    ];
                    _i = 0, CASES_1 = CASES;
                    _c.label = 1;
                case 1:
                    if (!(_i < CASES_1.length)) return [3 /*break*/, 5];
                    addr = CASES_1[_i];
                    mockSigner.setAddress(addr);
                    // check the storage twice
                    _a = expect;
                    return [4 /*yield*/, mockSigner.getAddress()];
                case 2:
                    // check the storage twice
                    _a.apply(void 0, [_c.sent()]).toStrictEqual(addr);
                    _b = expect;
                    return [4 /*yield*/, mockSigner.getAddress()];
                case 3:
                    _b.apply(void 0, [_c.sent()]).toStrictEqual(addr);
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it("should return deny txns", function () { return __awaiter(void 0, void 0, void 0, function () {
        var iface, CASES, _i, CASES_2, _a, from, to, id, amount, msg, contract;
        return __generator(this, function (_b) {
            iface = new abi_1.Interface(["function deposit(uint256 amount)", "function withdraw(uint256 amount)"]);
            CASES = [
                [(0, utils_1.createAddress)("0xbade0a0"), (0, utils_1.createAddress)("0xdef13"), "withdraw", 213, "wtf!"],
                [(0, utils_1.createAddress)("0xbade0a1"), (0, utils_1.createAddress)("0xdef12"), "deposit", 222, "ohhh"],
                [(0, utils_1.createAddress)("0xbade0a2"), (0, utils_1.createAddress)("0xdef11"), "deposit", 231, "wao"],
                [(0, utils_1.createAddress)("0xbade0a3"), (0, utils_1.createAddress)("0xdef10"), "withdraw", 240, "rejected!"],
            ];
            for (_i = 0, CASES_2 = CASES; _i < CASES_2.length; _i++) {
                _a = CASES_2[_i], from = _a[0], to = _a[1], id = _a[2], amount = _a[3], msg = _a[4];
                mockSigner.setAddress(from).denyTransaction(from, to, iface, id, [amount], msg);
                contract = new ethers_1.Contract(to, iface, mockSigner);
                // check the denial two times
                expect(contract[id](amount)).rejects.toMatch(msg);
                expect(contract[id](amount)).rejects.toMatch(msg);
            }
            return [2 /*return*/];
        });
    }); });
    it("should return allow txns", function () { return __awaiter(void 0, void 0, void 0, function () {
        var iface, CASES, _i, CASES_3, _a, from, to, id, amount, receipt, contract, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    iface = new abi_1.Interface(["function depositV2(string amount)", "function withdrawV2(string amount)"]);
                    CASES = [
                        [(0, utils_1.createAddress)("0xbade0a0"), (0, utils_1.createAddress)("0xdef13"), "withdrawV2", "213", { confirmations: 20 }],
                        [(0, utils_1.createAddress)("0xbade0a1"), (0, utils_1.createAddress)("0xdef12"), "depositV2", "222", { confirmations: 1 }],
                        [(0, utils_1.createAddress)("0xbade0a2"), (0, utils_1.createAddress)("0xdef11"), "depositV2", "231", { confirmations: 200 }],
                        [(0, utils_1.createAddress)("0xbade0a3"), (0, utils_1.createAddress)("0xdef10"), "withdrawV2", "240", { confirmations: 42 }],
                    ];
                    _i = 0, CASES_3 = CASES;
                    _d.label = 1;
                case 1:
                    if (!(_i < CASES_3.length)) return [3 /*break*/, 5];
                    _a = CASES_3[_i], from = _a[0], to = _a[1], id = _a[2], amount = _a[3], receipt = _a[4];
                    mockSigner.setAddress(from).allowTransaction(from, to, iface, id, [amount], receipt);
                    contract = new ethers_1.Contract(to, iface, mockSigner);
                    // check the denial two times
                    _b = expect;
                    return [4 /*yield*/, contract[id](amount)];
                case 2:
                    // check the denial two times
                    _b.apply(void 0, [(_d.sent()).wait()]).resolves.toStrictEqual(__assign({ events: [], logs: [] }, receipt));
                    _c = expect;
                    return [4 /*yield*/, contract[id](amount)];
                case 3:
                    _c.apply(void 0, [(_d.sent()).wait()]).resolves.toStrictEqual(__assign({ events: [], logs: [] }, receipt));
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it("should use the provider correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var iface, signer, contractAddress, contract, _a, id1, id2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    iface = new ethers_1.utils.Interface([
                        "function foo(uint256 val, string a, string b) external view returns (string id1, string id2)",
                    ]);
                    signer = (0, utils_1.createAddress)("0xe0a");
                    contractAddress = (0, utils_1.createAddress)("0xbade0a");
                    mockProvider.addCallFrom(contractAddress, signer, 42, iface, "foo", {
                        inputs: [1, "a", "b"],
                        outputs: ["20", "10"],
                    });
                    mockSigner.setAddress(signer);
                    contract = new ethers_1.Contract(contractAddress, iface, mockSigner);
                    return [4 /*yield*/, contract.foo(1, "a", "b", { blockTag: 42 })];
                case 1:
                    _a = _b.sent(), id1 = _a.id1, id2 = _a.id2;
                    expect([id1, id2]).toStrictEqual(["20", "10"]);
                    return [2 /*return*/];
            }
        });
    }); });
});
