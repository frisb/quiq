import { PersistentTransport } from './persistent';
import { ITokenizedTransportOptions } from '../contracts';
export declare class TokenizedTransport extends PersistentTransport {
    private tokenAddress;
    private tokenPayload;
    private webClient;
    constructor(options: ITokenizedTransportOptions);
    connect(): Promise<void>;
    private preflite();
}
