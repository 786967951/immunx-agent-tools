"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulticallContract = exports.MulticallProvider = exports.CachedContract = exports.ProviderCache = exports.NetworkManager = exports.toChecksumAddress = exports.createChecksumAddress = exports.createAddress = exports.padAddress = void 0;
var immunx_agent_1 = require("immunx-agent");
var network_manager_1 = __importDefault(require("./network.manager"));
exports.NetworkManager = network_manager_1.default;
var provider_cache_1 = require("./provider.cache");
Object.defineProperty(exports, "ProviderCache", { enumerable: true, get: function () { return provider_cache_1.ProviderCache; } });
var cached_contract_1 = __importDefault(require("./cached.contract"));
exports.CachedContract = cached_contract_1.default;
var multicall_provider_1 = require("./multicall.provider");
Object.defineProperty(exports, "MulticallProvider", { enumerable: true, get: function () { return multicall_provider_1.MulticallProvider; } });
Object.defineProperty(exports, "MulticallContract", { enumerable: true, get: function () { return multicall_provider_1.MulticallContract; } });
var padAddress = function (address) { return immunx_agent_1.ethers.utils.hexZeroPad(address, 20); };
exports.padAddress = padAddress;
var createAddress = function (address) { return (0, exports.padAddress)(address).toLowerCase(); };
exports.createAddress = createAddress;
var createChecksumAddress = function (address) { return (0, exports.toChecksumAddress)((0, exports.padAddress)(address)); };
exports.createChecksumAddress = createChecksumAddress;
var toChecksumAddress = function (address) { return immunx_agent_1.ethers.utils.getAddress(address.toLowerCase()); };
exports.toChecksumAddress = toChecksumAddress;