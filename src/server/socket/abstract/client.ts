import { IWSSocket, IClient, ISession, IEnvelope, Message, IIncomingMessage } from '../contracts';
import { AbstractConnection } from './connection';
import { Writeln } from 'writeln';

const logger = new Writeln('Client');

export abstract class AbstractClient<TSession extends ISession>
extends AbstractConnection<TSession>
implements IClient {
  public constructor (public socket: IWSSocket, protected request: IIncomingMessage) {
    super();

    socket
      .on('message', (payload: string) => {
        logger.debug('payload', payload);

        try {
          let envelope = this.parseEnvelope(payload);
          let eventName = this.getEventName(envelope);
          let message = this.parseMessage(envelope);
          let handlerName = transformer(eventName);
          let handler = this[handlerName];

          // let key = chalk.dim(`${ipv4}-${ID}`);
          // logger.debug(`${ key } > ${ method } ${ url }`, body);

          if (handler) {
            try {
              let response = handler.call(this, message);

              if (response)
                this.send(response);
            }
            catch (err) {
              this.error(400, err.message, err);
            }
          }
          else {
            logger.error(`Client does not implement "${ handlerName }" handler.`);
          }
        }
        catch (e) {
          this.error(400, 'Bad Request', e);
        }
      })
      .on('close', (code: number, message: string) => {
        logger.debug(`Socket closed ${ code } ${ message }`);
        this.emit('close', code, message);
      });

    logger.debug('upgrade request url', request.url);
  }

  public get isInitialized() {
  	return this.socket !== null;
  }

  public close() {
    if (this.socket !== null) {
	    (<any> this.socket).terminate();
	    this.socket = null;

	    super.close();
    }
  }

  public async send(payloadOrPromise: any): Promise<{}> {
    return new Promise((resolve, reject) => {
      try {
        if (payloadOrPromise.then instanceof Function) {
          payloadOrPromise
            .then((payload: any) => this.sendSync(payload))
            .then(resolve)
            .catch(reject);
        }
        else {
          this.sendSync(payloadOrPromise);
          resolve();
        }
      }
      catch(err) {
        reject(err);
      }
    });
  }

  public error(code: number, message: string, error?: Error) {
		this.send({
      error: {
        code,
        message
      }
    });

		logger.error(`${code} ${message}`, error);
	};

  public abstract parseEnvelope(payload: string): IEnvelope<any>;

  public abstract parseMessage(envelope: IEnvelope<any>): Message<any>;

  public abstract getEventName(message: any): string;

  private sendSync(payload: any): void {
    logger.debug('send', payload);

    try {
      this.socket.send(JSON.stringify(payload));
    }
    catch (err) {
      logger.error(err.message, err);
    }
  }
}

function transformer(eventName: string): string {
	let fnName = upperFirst(eventName);

	if (fnName.indexOf(':') > -1) {
		let words = fnName.split(':');
		fnName = '';

		for (let i = 0, { length } = words; i < length; i++) {
			let word = words[i];

			fnName += (i === 0 ? word : upperFirst(word));
		}
	}

	return `on${ fnName }`;
}

function upperFirst(word: string): string {
		let str = '';

		for (let i = 0, { length } = word; i < length; i++) {
			let char = word.charAt(i);

			if (i === 0)
				char = char.toUpperCase();

			str += char;
		}

		return str;
}
