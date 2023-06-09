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
exports.ProviderCache = void 0;
var async_mutex_1 = require("async-mutex");
var lru_cache_1 = __importDefault(require("lru-cache"));
var properties_1 = require("@ethersproject/properties");
var ProviderCache = /** @class */ (function () {
    function ProviderCache() {
    }
    ProviderCache.createProxy = function (provider, cacheByBlockTag) {
        if (cacheByBlockTag === void 0) { cacheByBlockTag = true; }
        if (this.blockDataCache === undefined && cacheByBlockTag) {
            this.blockDataCache = new lru_cache_1.default({ max: this.options.blockDataCacheSize });
        }
        if (this.immutableDataCache === undefined && !cacheByBlockTag) {
            this.immutableDataCache = new lru_cache_1.default({ max: this.options.immutableDataCacheSize });
        }
        return new Proxy(provider, {
            get: function (target, prop) {
                if (prop === "call") {
                    var cb = function (transaction, blockTag) {
                        return ProviderCache.call(target, transaction, blockTag, cacheByBlockTag);
                    };
                    return cb;
                }
                else {
                    return target[prop];
                }
            },
        });
    };
    ProviderCache.isTransactionCacheable = function (transaction, blockTag) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blockTag];
                    case 1:
                        blockTag = _a.sent();
                        if (blockTag === "latest" || blockTag == null) {
                            return [2 /*return*/, false];
                        }
                        if (typeof blockTag === "number" && !Number.isInteger(blockTag)) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, transaction.to];
                    case 2:
                        if ((_a.sent()) == null) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    ProviderCache.computeCacheKey = function (transaction, blockTag, cacheByBlockTag) {
        var data = transaction.data.slice(2);
        var to = transaction.to ? transaction.to.slice(2) : "";
        var block = cacheByBlockTag ? blockTag.slice(2) : "";
        var isOddLength = (data.length + to.length + block.length) & 1;
        return Buffer.from("".concat(to).concat(isOddLength ? "0" : "").concat(block).concat(data), "hex").toString("base64");
    };
    ProviderCache.outputToBuffer = function (output) {
        return Buffer.from(output.slice(2), "hex");
    };
    ProviderCache.bufferToOutput = function (buffer) {
        return "0x".concat(buffer.toString("hex"));
    };
    ProviderCache.call = function (provider, transaction, blockTag, cacheByBlockTag) {
        return __awaiter(this, void 0, void 0, function () {
            var resolved, key, _a, cache, mutex, promise, release;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        provider;
                        return [4 /*yield*/, this.isTransactionCacheable(transaction, blockTag)];
                    case 1:
                        if (!!(_b.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, provider.call(transaction, blockTag)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, (0, properties_1.resolveProperties)({
                            transaction: provider._getTransactionRequest(transaction),
                            blockTag: provider._getBlockTag(blockTag),
                        })];
                    case 4:
                        resolved = _b.sent();
                        key = this.computeCacheKey(resolved.transaction, resolved.blockTag, cacheByBlockTag);
                        _a = cacheByBlockTag
                            ? [this.blockDataCache, this.blockDataCacheMutex]
                            : [this.immutableDataCache, this.immutableDataCacheMutex], cache = _a[0], mutex = _a[1];
                        return [4 /*yield*/, mutex.acquire()];
                    case 5:
                        release = _b.sent();
                        try {
                            if (cache.has(key)) {
                                promise = cache.get(key);
                            }
                            else {
                                promise = provider.call(transaction, blockTag).then(function (output) { return _this.outputToBuffer(output); });
                                cache.set(key, promise);
                            }
                        }
                        finally {
                            release();
                        }
                        return [2 /*return*/, promise.then(function (buffer) { return _this.bufferToOutput(buffer); })];
                }
            });
        });
    };
    ProviderCache.updateBlockDataCache = function () {
        if (this.blockDataCache !== undefined) {
            this.blockDataCache = new lru_cache_1.default({ max: this.options.blockDataCacheSize });
        }
    };
    ProviderCache.updateImmutableDataCache = function () {
        if (this.immutableDataCache !== undefined) {
            this.immutableDataCache = new lru_cache_1.default({ max: this.options.immutableDataCacheSize });
        }
    };
    ProviderCache.clear = function () {
        var _a, _b;
        (_a = this.blockDataCache) === null || _a === void 0 ? void 0 : _a.clear();
        (_b = this.immutableDataCache) === null || _b === void 0 ? void 0 : _b.clear();
    };
    ProviderCache.set = function (options) {
        this.options = __assign(__assign({}, this.options), options);
        if (options.blockDataCacheSize !== undefined) {
            this.updateBlockDataCache();
        }
        if (options.immutableDataCacheSize !== undefined) {
            this.updateImmutableDataCache();
        }
    };
    ProviderCache.blockDataCacheMutex = new async_mutex_1.Mutex();
    ProviderCache.immutableDataCacheMutex = new async_mutex_1.Mutex();
    ProviderCache.options = {
        blockDataCacheSize: 200,
        immutableDataCacheSize: 100,
    };
    return ProviderCache;
}());
exports.ProviderCache = ProviderCache;
