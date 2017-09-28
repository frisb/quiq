import * as WebSocket from 'ws';
import { EventEmitter } from 'events';
import { Writeln } from 'writeln';
import { State } from './state';
import { IBaseTransportOptions } from '../contracts';

const logger = new Writeln('Transport');

export class BaseTransport extends EventEmitter {
	protected address: string;
	private socket: WebSocket = null;
	private protocol: string;

	constructor({ address, protocol }: IBaseTransportOptions) {
    super();

    this.address = address;
    this.protocol = protocol;
  }

  public get state(): State {
    return this.socket === null ? State.UNINITIALIZED : this.socket.readyState;
  }

  public async connect(address?: string): Promise<{}> {
    return new Promise((resolve, reject) => {
      if (this.socket === null) {
        logger.info(`Connecting to ${address} ...`);

        let ws = new WebSocket(address || this.address, [this.protocol]);

        ws.on('open', () => {
          logger.info('connected');
          this.emit('connected');
          resolve();
        });

        ws.on('close', () => {
          logger.info('disconnected');
          this.emit('disconnected');
          this.socket = null;
        });

        ws.on('error', (err) => {
          this.emit('error', err);
          logger.warn('error', err);

          reject(err);
        });

        ws.on('message', (data) => {
          let obj = JSON.parse(data);
          logger.debug('< Received', obj);
          this.emit('message', obj);
        });

        this.socket = ws;
      }
      else if (this.state === State.OPEN) {
        resolve();
      }
      else {
        reject('Socket exists but readyState is ' + this.state);
      }
    });
  }

  public disconnect() {
    if (this.socket !== null)
      this.socket.close();
  }

  public send(message: string) {
    if (this.state === State.OPEN) {
      this.socket.send(message);
      logger.info('> Sent', message);
      this.emit('sent', message);
    }
    else {
      this.emit('error', 'send connectivity');
    }
  }
}