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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jest_when_1 = require("jest-when");
var mock_ethers_signer_1 = __importDefault(require("./mock_ethers_signer"));
var utils_1 = require("../utils");
var MockEthersProvider = /** @class */ (function () {
    function MockEthersProvider() {
        this._isProvider = true;
        this.call = jest.fn().mockImplementation(this.unconfiguredAsyncMockImplementation("call"));
        this.getLogs = jest.fn().mockImplementation(this._getLogs.bind(this));
        this.getBlock = jest.fn().mockImplementation(this.unconfiguredAsyncMockImplementation("getBlock"));
        this.getSigner = jest.fn().mockImplementation(this.unconfiguredAsyncMockImplementation("getSigner"));
        this.getStorageAt = jest.fn().mockImplementation(this.unconfiguredAsyncMockImplementation("getStorageAt"));
        this.getBlockNumber = jest.fn().mockImplementation(this.unconfiguredAsyncMockImplementation("getBlockNumber"));
        this.getNetwork = jest.fn().mockImplementation(this.unconfiguredAsyncMockImplementation("getNetwork"));
        this.logs = [];
    }
    MockEthersProvider.prototype.unconfiguredAsyncMockImplementation = function (method) {
        var _this = this;
        return function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("".concat(method, " was not configured for this input"));
            });
        }); };
    };
    MockEthersProvider.prototype.addCallTo = function (contract, block, iface, id, params) {
        (0, jest_when_1.when)(this.call)
            .calledWith({
            data: iface.encodeFunctionData(id, params.inputs),
            to: (0, utils_1.toChecksumAddress)(contract),
        }, block)
            .mockReturnValue(Promise.resolve(iface.encodeFunctionResult(id, params.outputs)));
        return this;
    };
    MockEthersProvider.prototype.addCallFrom = function (contract, from, block, iface, id, params) {
        (0, jest_when_1.when)(this.call)
            .calledWith({
            data: iface.encodeFunctionData(id, params.inputs),
            to: (0, utils_1.toChecksumAddress)(contract),
            from: from,
        }, block)
            .mockReturnValue(Promise.resolve(iface.encodeFunctionResult(id, params.outputs)));
        return this;
    };
    MockEthersProvider.prototype.addStorage = function (contract, slot, block, result) {
        (0, jest_when_1.when)(this.getStorageAt).calledWith(contract, slot, block).mockReturnValue(Promise.resolve(result));
        return this;
    };
    MockEthersProvider.prototype.addBlock = function (blockNumber, block) {
        (0, jest_when_1.when)(this.getBlock).calledWith(blockNumber).mockReturnValue(Promise.resolve(block));
        return this;
    };
    MockEthersProvider.prototype.setLatestBlock = function (block) {
        (0, jest_when_1.when)(this.getBlockNumber).calledWith().mockReturnValue(Promise.resolve(block));
        return this;
    };
    MockEthersProvider.prototype.addSigner = function (addr) {
        (0, jest_when_1.when)(this.getSigner).calledWith(addr).mockReturnValue(new mock_ethers_signer_1.default(this).setAddress(addr));
        return this;
    };
    MockEthersProvider.prototype.addLogs = function (logs) {
        var _a;
        (_a = this.logs).push.apply(_a, logs);
        return this;
    };
    MockEthersProvider.prototype._getLogs = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var logs, filterTopics_1;
            return __generator(this, function (_a) {
                logs = this.logs;
                if (filter.address) {
                    logs = logs.filter(function (log) { return log.address.toLowerCase() === filter.address.toLowerCase(); });
                }
                if (filter.topics) {
                    filterTopics_1 = filter.topics;
                    logs = logs.filter(function (log) {
                        if (filterTopics_1.length > log.topics.length) {
                            return false;
                        }
                        for (var i = 0; i < filterTopics_1.length; i++) {
                            var logTopic = log.topics[i];
                            var filterTopic = filterTopics_1[i];
                            if (filterTopic === null)
                                continue;
                            if (!logTopic)
                                return false;
                            if (Array.isArray(filterTopic)) {
                                if (!filterTopic.includes(logTopic)) {
                                    return false;
                                }
                            }
                            else if (logTopic !== filterTopic) {
                                return false;
                            }
                        }
                        return true;
                    });
                }
                if ("fromBlock" in filter && filter.fromBlock !== undefined) {
                    logs = logs.filter(function (log) { return log.blockNumber >= filter.fromBlock; });
                }
                if ("toBlock" in filter && filter.toBlock !== undefined) {
                    logs = logs.filter(function (log) { return log.blockNumber <= filter.toBlock; });
                }
                if ("blockHash" in filter && filter.blockHash !== undefined) {
                    logs = logs.filter(function (log) { return log.blockHash <= filter.blockHash; });
                }
                return [2 /*return*/, logs];
            });
        });
    };
    MockEthersProvider.prototype.setNetwork = function (chainId, ensAddress, name) {
        if (ensAddress === void 0) { ensAddress = (0, utils_1.createAddress)("0x0"); }
        if (name === void 0) { name = ""; }
        (0, jest_when_1.when)(this.getNetwork).calledWith().mockReturnValue({ chainId: chainId, ensAddress: ensAddress, name: name });
    };
    MockEthersProvider.prototype.clear = function () {
        (0, jest_when_1.resetAllWhenMocks)();
        this.logs = [];
    };
    return MockEthersProvider;
}());
exports.default = MockEthersProvider;
