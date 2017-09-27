import { EventEmitter } from 'events';
import { IClient } from './IClient';
import { IGateway } from './IGateway';

export interface ISession extends EventEmitter {
	ID: string;
	client: IClient;
	gateway?: IGateway;
	backgroundMins: number;
	end(code?: number, message?: string): void;
}