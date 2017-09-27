import { ISession } from './ISession';

export interface IConnection {
	init(session: ISession): void;
	close(): void;
	onInit(): void;
	onClosed(): void;
}
