import { EventEmitter } from 'events';
import { AuthToken } from '../../shared/webclient';

export class Token extends AuthToken {
	constructor() {
		super();
	}

	protected emit(event: string | symbol, ...args: Array<any>): boolean {
		return EventEmitter.prototype.emit.call(this, event, ...args);
	}

	protected on(event: string | symbol, listener: Function): this {
		EventEmitter.prototype.on.call(this, event, listener);
		return this;
	}
}
