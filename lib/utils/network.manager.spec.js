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
var test_1 = require("../test");
var network_manager_1 = __importDefault(require("./network.manager"));
var Network;
(function (Network) {
    Network[Network["ETHEREUM_MAINNET"] = 1] = "ETHEREUM_MAINNET";
    Network[Network["POLYGON"] = 137] = "POLYGON";
    Network[Network["ARBITRUM"] = 42161] = "ARBITRUM";
})(Network || (Network = {}));
describe("NetworkManager test suite", function () {
    describe("constructor", function () {
        it("should leave the network as -1 if no chainId was specified", function () {
            var networkManager = new network_manager_1.default({});
            expect(networkManager.getNetworkMap()).toStrictEqual({});
            expect(networkManager.getNetwork()).toStrictEqual(-1);
        });
        it("should check if the specified chainId is supported and throw errors accordingly", function () {
            var _a;
            var data = (_a = {},
                _a[Network.ETHEREUM_MAINNET] = {
                    test: "test",
                },
                _a);
            var networkManager;
            expect(function () {
                networkManager = new network_manager_1.default(data, Network.ETHEREUM_MAINNET);
            }).not.toThrowError("The network with ID ".concat(Network.ETHEREUM_MAINNET, " is not supported"));
            expect(networkManager.getNetworkMap()).toStrictEqual(data);
            expect(networkManager.getNetwork()).toStrictEqual(Network.ETHEREUM_MAINNET);
            expect(function () {
                networkManager = new network_manager_1.default(data, Network.POLYGON);
            }).toThrowError("The network with ID ".concat(Network.POLYGON, " is not supported"));
        });
    });
    describe("init", function () {
        var provider;
        var mockProvider;
        beforeAll(function () {
            mockProvider = new test_1.MockEthersProvider();
            mockProvider.setNetwork(Network.ETHEREUM_MAINNET);
            provider = mockProvider;
        });
        it("should check if the fetched chainId is supported and throw errors accordingly", function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, networkManager;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = (_a = {},
                            _a[Network.ETHEREUM_MAINNET] = {
                                test: "test",
                            },
                            _a);
                        networkManager = new network_manager_1.default(data);
                        return [4 /*yield*/, expect(networkManager.init(provider)).resolves.toBeUndefined()];
                    case 1:
                        _b.sent();
                        expect(networkManager.getNetwork()).toStrictEqual(Network.ETHEREUM_MAINNET);
                        mockProvider.setNetwork(Network.POLYGON);
                        return [4 /*yield*/, expect(networkManager.init(provider)).rejects.toThrowError("The network with ID ".concat(Network.POLYGON, " is not supported"))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("set network", function () {
        it("should check if the specified chainId is supported and throw errors accordingly", function () {
            var _a;
            var data = (_a = {},
                _a[Network.ETHEREUM_MAINNET] = {
                    test: "test",
                },
                _a[Network.POLYGON] = {
                    test: "test",
                },
                _a);
            var networkManager = new network_manager_1.default(data);
            expect(function () {
                networkManager.setNetwork(Network.ETHEREUM_MAINNET);
            }).not.toThrowError("The network with ID ".concat(Network.ETHEREUM_MAINNET, " is not supported"));
            expect(function () {
                networkManager.setNetwork(Network.POLYGON);
            }).not.toThrowError("The network with ID ".concat(Network.POLYGON, " is not supported"));
            expect(function () {
                networkManager.setNetwork(Network.ARBITRUM);
            }).toThrowError("The network with ID ".concat(Network.ARBITRUM, " is not supported"));
        });
    });
    describe("get", function () {
        it("should get the correct value for a key according to the network", function () {
            var _a;
            var data = (_a = {},
                _a[Network.ETHEREUM_MAINNET] = {
                    test: "Ethereum",
                },
                _a[Network.POLYGON] = {
                    test: "Polygon",
                },
                _a);
            var networkManager = new network_manager_1.default(data, Network.ETHEREUM_MAINNET);
            expect(networkManager.get("test")).toStrictEqual("Ethereum");
            networkManager.setNetwork(Network.POLYGON);
            expect(networkManager.get("test")).toStrictEqual("Polygon");
        });
    });
});
