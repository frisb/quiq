import { PersistentTransport }  from './persistent';
import { AuthWebClient } from '../webclient';
import { ITokenizedTransportOptions } from '../contracts';
import { IWrappedToken, IAuthWebClient } from '../../shared';
import { Token } from '../webclient/token';

export class TokenizedTransport extends PersistentTransport {
	private tokenAddress: string;
	private tokenPayload: any;
  private webClient: IAuthWebClient<Token>;

	constructor(options: ITokenizedTransportOptions) {
    super(options);

    let { tokenAddress, tokenPayload, userAgent } = options;

    this.tokenAddress = tokenAddress;
    this.tokenPayload = tokenPayload;
    this.webClient = new AuthWebClient(userAgent);
  }

  public async connect(): Promise<void> {
		try {
			let { access_token } = await this.preflite();

			return await super.connect(`${this.address}/${access_token}`);
		}
		catch (err) {
			if (err.name === 'ConnectivityError') {
				this.emit('error', 'token connectivity');
			}
			else {
				this.emit('error', err);
			}
		}
  }

  private async preflite(): Promise<IWrappedToken> {
    let { webClient } = this;
    let { isValid, access } = webClient.token;

    if (isValid) {
      return { token_type: 'bearer', access_token: access };
    }
    else {
      let {tokenAddress, tokenPayload} = this;

      return await webClient.authorize(tokenAddress, tokenPayload);
    }
  }
}
