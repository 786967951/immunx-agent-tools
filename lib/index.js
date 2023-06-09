"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulticallContract = exports.MulticallProvider = exports.CachedContract = exports.ProviderCache = exports.NetworkManager = exports.toChecksumAddress = exports.createChecksumAddress = exports.createAddress = exports.padAddress = exports.handlers = void 0;
var handlers = __importStar(require("./handler"));
exports.handlers = handlers;
var utils_1 = require("./utils");
Object.defineProperty(exports, "padAddress", { enumerable: true, get: function () { return utils_1.padAddress; } });
Object.defineProperty(exports, "createAddress", { enumerable: true, get: function () { return utils_1.createAddress; } });
Object.defineProperty(exports, "createChecksumAddress", { enumerable: true, get: function () { return utils_1.createChecksumAddress; } });
Object.defineProperty(exports, "toChecksumAddress", { enumerable: true, get: function () { return utils_1.toChecksumAddress; } });
Object.defineProperty(exports, "NetworkManager", { enumerable: true, get: function () { return utils_1.NetworkManager; } });
Object.defineProperty(exports, "ProviderCache", { enumerable: true, get: function () { return utils_1.ProviderCache; } });
Object.defineProperty(exports, "CachedContract", { enumerable: true, get: function () { return utils_1.CachedContract; } });
Object.defineProperty(exports, "MulticallProvider", { enumerable: true, get: function () { return utils_1.MulticallProvider; } });
Object.defineProperty(exports, "MulticallContract", { enumerable: true, get: function () { return utils_1.MulticallContract; } });
exports.default = {
    handlers: handlers,
    padAddress: utils_1.padAddress,
    createAddress: utils_1.createAddress,
    createChecksumAddress: utils_1.createChecksumAddress,
    toChecksumAddress: utils_1.toChecksumAddress,
    NetworkManager: utils_1.NetworkManager,
    ProviderCache: utils_1.ProviderCache,
    CachedContract: utils_1.CachedContract,
    MulticallProvider: utils_1.MulticallProvider,
    MulticallContract: utils_1.MulticallContract,
};
