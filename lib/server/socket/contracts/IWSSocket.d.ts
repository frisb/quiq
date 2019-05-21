/// <reference types="node" />
import { Socket } from 'net';
export interface IWSSocket extends Socket {
    send(data: any, cb?: (err: Error) => void): void;
    send(data: any, options: {
        mask?: boolean;
        binary?: boolean;
    }, cb?: (err: Error) => void): void;
}
