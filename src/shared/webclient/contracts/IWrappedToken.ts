export interface IWrappedToken {
	[key: string]: any;

	access_token: string;
	token_type: string;
	expires_in?: number;
}
