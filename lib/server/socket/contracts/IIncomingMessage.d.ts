/// <reference types="node" />
import { IncomingMessage } from 'http';
export interface IIncomingMessage<TTokenData> extends IncomingMessage {
    tokenData: TTokenData;
    ipv4: string;
    protocol: string;
}
