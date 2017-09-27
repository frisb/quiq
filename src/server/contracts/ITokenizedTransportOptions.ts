import { IPersistentTransportOptions } from './IPersistentTransportOptions';

export interface ITokenizedTransportOptions extends IPersistentTransportOptions {
	tokenAddress: string;
	tokenPayload: any;
	userAgent: string;
}
