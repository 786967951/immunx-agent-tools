import { TransactionEvent, ethers } from "immunx-agent";
interface TraceProps {
    function?: ethers.utils.FunctionFragment | string;
    to?: string;
    from?: string;
    arguments?: any[];
    output?: any[];
    value?: string;
    traceAddress?: number[];
}
export declare class TestTransactionEvent extends TransactionEvent {
    constructor();
    setHash(hash: string): TestTransactionEvent;
    setFrom(address: string): TestTransactionEvent;
    setTo(address: string): TestTransactionEvent;
    setValue(value: string): TestTransactionEvent;
    setGas(value: string): TestTransactionEvent;
    setGasPrice(value: string): TestTransactionEvent;
    setData(data: string): TestTransactionEvent;
    setGasUsed(value: string): TestTransactionEvent;
    setTimestamp(timestamp: number): TestTransactionEvent;
    setBlock(block: number): TestTransactionEvent;
    addEventLog(event: ethers.utils.EventFragment | string, address?: string, inputs?: ReadonlyArray<any>): TestTransactionEvent;
    addInvolvedAddresses(...addresses: string[]): TestTransactionEvent;
    addTraces(...traceProps: TraceProps[]): TestTransactionEvent;
}
export {};
