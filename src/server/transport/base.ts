import * as WebSocket from 'ws';
import { EventEmitter } from 'events';
import { Logger } from 'writeln';
import { State } from './state';
import { IBaseTransportOptions } from '../contracts';

const logger = new Logger('Transport');

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

  public async connect(address = this.address): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.socket === null) {
        logger.info(`Connecting to ${address} ...`);

        try {
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

	        ws.on('message', (data: string) => {
		        let obj = JSON.parse(data);
		        logger.debug('< Received', obj);
		        this.emit('message', obj);
	        });

	        this.socket = ws;
        }
        catch (err) {
	        logger.error(`Connection failure to ${address} ...`);

          reject(err);
        }
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
      try {
	      this.socket.send(message);
	      logger.info('> Sent', message);
	      this.emit('sent', message);
      }
      catch (err) {
        logger.error(err.message, err.stack);
      }
    }
    else {
      this.emit('error', 'send connectivity');
    }
  }
}