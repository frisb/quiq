import { HttpError } from 'routing-controllers';
import { sign, verify, JsonWebTokenError, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { Logger } from 'writeln';
import { ISigningOptions } from './contracts';
import { IWrappedToken } from '../shared/';

const logger = new Logger('Tokenizer');

export class IpAddressError extends HttpError {
	constructor() {
		super(401, 'Unauthorized');
	}
}

export class HostError extends HttpError {
	constructor() {
		super(401, 'Unauthorized');
	}
}

export class NoTokenError extends HttpError {
	constructor() {
		super(403, 'Forbidden');
	}
}

export class TokenInvalidError extends HttpError {
	constructor(err: Error) {
		super(498, 'Token expired/invalid');

		logger.error(`${ err.message } %o`, err);
	}
}

export class Tokenizer {
	constructor(public signing: ISigningOptions) {}

	public wrap(remoteIP: string, channelOrigin: string, data: any, include?: string[]): IWrappedToken {
		let { expirySeconds, secret, algorithm } = this.signing;
		let options = { expiresIn: expirySeconds, algorithm } as SignOptions;

		data.ip = remoteIP;
		data.origin = channelOrigin;

		let accessToken = sign(data, secret, options);

		let wrappedToken: IWrappedToken = {
			access_token: accessToken,
			token_type: 'bearer',
			expires_in: expirySeconds
		};

		if (include) {
			for (let i = 0, { length } = include; i < length; i++) {
				let key = include[i];
				let val = data[key];

				if (val)
					wrappedToken[key] = val;
			}
		}

		return wrappedToken;
	}

	public async unwrap(remoteIP: string, channelOrigin: string, token: string): Promise<{}> {
		let { algorithm, secret } = this.signing;

		return new Promise(function (resolve, reject) {
			let algorithms = [algorithm];
			let options = { algorithms } as VerifyOptions;

			verify(token, secret, options, function (err: JsonWebTokenError, data: any) {
				if (err) {
					reject(new TokenInvalidError(err));
				}
				else {
					let { ip, origin } = data;

					// if (ip !== remoteIP) {
					// 	reject(new IpAddressError());
					// }
					// else if (origin !== channelOrigin) {
					// 	reject(new HostError());
					// }
					// else {
						let tokenData: any = {};

						for (let key in data) {
							if (key !== 'iat' && key !== 'exp' && key !== 'ip')
								tokenData[key] = data[key];
						}

						resolve(tokenData);
					// }
				}
			});
		});
	}
}
