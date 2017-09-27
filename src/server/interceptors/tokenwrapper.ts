import { InterceptorInterface, Action } from 'routing-controllers';
import { IRequest, ISigningOptions } from '../contracts';
import { Tokenizer } from '../tokenizer';
import { Writeln } from 'writeln';
import { IWrappedToken } from '../../common';

const logger = new Writeln('Token Wrapper Interceptor');

export function TokenWrapper(signing: ISigningOptions, ...fieldNames: string[]): any {
	const tokenizer = new Tokenizer(signing);

	class TokenWrapper implements InterceptorInterface {
		public intercept(action: Action, payload: any): IWrappedToken {
			let { ipv4, hostname, socket } = <IRequest> action.request;
			let channelOrigin = `${ hostname }:${ socket.localPort }`;
			let include: Array<string> = [];

			for (let i = 0, { length } = fieldNames; i < length; i++) {
				let name: string = fieldNames[i];

				if (payload[name])
					include.push(name);
			}

			logger.debug('Wrapping', { payload, include });

			return tokenizer.wrap(ipv4, channelOrigin, payload, include);
		}
	}

	return TokenWrapper;
}
