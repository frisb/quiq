import { EventEmitter } from 'events';
import { AuthToken } from '../../shared/webclient/auth/token';

export class Token extends AuthToken {
	protected emit(event: string | symbol, ...args: Array<any>): boolean {
		return EventEmitter.prototype.emit.call(this, event, ...args);
	}

	protected on(event: string | symbol, listener: Function): this {
		EventEmitter.prototype.on.call(this, event, listener);
		return this;
	}
}
