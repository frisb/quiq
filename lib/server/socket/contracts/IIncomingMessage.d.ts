/// <reference types="node" />
import { IncomingMessage } from 'http';
export interface IIncomingMessage extends IncomingMessage {
    tokenData: any;
    ipv4: string;
}
