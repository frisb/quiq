import { IWrappedToken } from './IWrappedToken';

export interface IAuthToken {
	access: string;
	expires: Date;
	// expiryTimeoutID: NodeJS.Timer;
	isValid: boolean;
	refresh: (wrappedToken: IWrappedToken) => void;
}
