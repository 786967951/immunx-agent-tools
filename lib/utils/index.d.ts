import NetworkManager from "./network.manager";
import { ProviderCache, ProviderCacheOptions } from "./provider.cache";
import CachedContract from "./cached.contract";
import { MulticallProvider, MulticallContract } from "./multicall.provider";
export declare const padAddress: (address: string) => string;
export declare const createAddress: (address: string) => string;
export declare const createChecksumAddress: (address: string) => string;
export declare const toChecksumAddress: (address: string) => string;
export { NetworkManager, ProviderCache, ProviderCacheOptions, CachedContract, MulticallProvider, MulticallContract };
