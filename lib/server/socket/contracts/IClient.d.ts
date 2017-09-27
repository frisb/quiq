import { Message } from './Message';
import { IEnvelope } from './IEnvelope';
import { IWSSocket } from './IWSSocket';
import { IConnection } from './IConnection';
export interface IClient extends IConnection {
    socket: IWSSocket;
    send(payload: any): void;
    parseEnvelope(payload: string): IEnvelope<any>;
    parseMessage(envelope: IEnvelope<any>): Message<any>;
    getEventName(message: any): string;
}
