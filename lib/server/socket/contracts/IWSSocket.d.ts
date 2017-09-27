import { IncomingMessage } from 'http';
import { Socket } from 'net';
export interface IWSSocket extends Socket {
    protocol: string;
    tokenData: any;
    ipv4: string;
    upgradeReq: IncomingMessage;
    send(data: any, cb?: (err: Error) => void): void;
    send(data: any, options: {
        mask?: boolean;
        binary?: boolean;
    }, cb?: (err: Error) => void): void;
}
