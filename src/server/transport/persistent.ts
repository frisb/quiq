import { Writeln } from 'writeln';
import { BaseTransport }  from './base';
import { State }  from './state';
import { IPersistentTransportOptions } from '../contracts';

const logger = new Writeln('Persistent Transport');

export class PersistentTransport extends BaseTransport {
	private retryInterval: number;
	private reconnectTimerID: NodeJS.Timer = null;
	private mustReconnect: boolean = true;

  constructor(options: IPersistentTransportOptions) {
    super(options);

    this.retryInterval = options.retryInterval || -1;

    this
      .on('connected', () => {
        if (this.reconnectTimerID !== null) {
          clearInterval(this.reconnectTimerID);
          this.reconnectTimerID = null;
        }
      })
      .on('disconnected', () => {
        if (this.retryInterval > 0 && this.mustReconnect)
          this.reconnect();
      });
  }

  public disconnect(mustReconnect?: boolean) {
    if (typeof(mustReconnect) !== 'undefined' && mustReconnect === false)
      this.mustReconnect = false;

    super.disconnect();
  }

	public send(message: any) {
    super.send(JSON.stringify(message));
  }

  private reconnect() {
    let { retryInterval } = this;

    if (retryInterval > 0 && this.reconnectTimerID === null) {
      this.reconnectTimerID = setInterval(() => {
        if (this.state !== State.OPEN) {
          logger.info(`retrying in ${Math.floor(retryInterval / 1000)}sec`);
          this.connect();
        }
      }, retryInterval);
    }
  }
}
