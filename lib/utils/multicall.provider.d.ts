import { Contract as MulticallContract, ContractCall } from "ethers-multicall";
import { Provider as EthersProvider } from "@ethersproject/providers";
export declare const MULTICALL2_ABI: string[];
declare type AllResult<T extends any[]> = [success: true, returns: T] | [success: false, returns: never[]];
declare type TryAllResult<T extends any[]> = number extends T["length"] ? {
    [K in keyof T]: K extends number ? {
        success: true;
        returnData: T[K];
    } | {
        success: false;
        returnData: never[];
    } : T[K];
} : {
    [K in keyof T]: {
        success: true;
        returnData: T[K];
    } | {
        success: false;
        returnData: never[];
    };
};
declare type GroupAllResult<T extends any[][]> = [
    success: true,
    returns: {
        [K in keyof T]: T[K];
    }
] | [success: false, returns: never[][]];
declare type GroupTryAllResult<T extends any[][]> = {
    [K in keyof T]: TryAllResult<T[K]>;
};
declare class _Provider {
    protected _provider: EthersProvider;
    protected _multicallAddress: string;
    constructor(provider: EthersProvider, chainId?: number);
    init(): Promise<void>;
    getEthBalance(address: string): any;
}
declare const MulticallProvider_base: new (provider: EthersProvider, chainId?: number) => _Provider;
/**
 * Provider class heavily based on ethers-multicall, but supporting specifying a blockTag for the multicall contract
 * call and `tryAggregate`.
 */
declare class MulticallProvider extends MulticallProvider_base {
    constructor(provider: EthersProvider, chainId?: number);
    static setMulticall2Addresses(addresses: Record<number, string>): void;
    init(): Promise<void>;
    /**
     * Requires success of all calls.
     * @returns Tuple of format [success, results]. `success` indicates whether all the calls were successful or at least
     * one of them failed.
     */
    all<T extends any[] = any[]>(calls: ContractCall[], blockTag?: number | string, batchSize?: number): Promise<AllResult<T>>;
    /**
     * Does not require success of calls, returns the success status and result of each call.
     */
    tryAll<T extends any[] = any[]>(calls: ContractCall[], blockTag?: number | string, batchSize?: number): Promise<TryAllResult<T>>;
    /**
     * Similar to `all` but supports a group of calls as an input. Preserves the inputs calls structure.
     */
    groupAll<T extends any[][] = any[][]>(callGroups: ContractCall[][], blockTag?: number | string, batchSize?: number): Promise<GroupAllResult<T>>;
    /**
     * Similar to `tryAll` but supports a group of calls as an input. Preserves the inputs calls structure.
     */
    groupTryAll<T extends any[][] = any[][]>(callGroups: ContractCall[][], blockTag?: number | string, batchSize?: number): Promise<GroupTryAllResult<T>>;
    private _tryAll;
    private _all;
    /**
     * Helper function to split the calls array into sub-arrays of size n.
     */
    private batchArray;
    /**
     * Sets the Multicall2 contract address to a specific chain ID deployed contract.
     * Throws an error if there's no known contract address for that chain ID.
     */
    private setMulticallAddress;
}
export { MulticallContract, MulticallProvider };
