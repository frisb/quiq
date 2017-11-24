import { IWrappedToken, IAuthToken } from '../contracts/index';

export abstract class AuthToken implements IAuthToken {
	public access: string = null;
	public expires: Date = null;

	private expiryTimeoutID: any = null;

	constructor() {
		this.startCountdown();
	}

	public get isValid() {
		return this.access !== null && this.expires >= new Date();
	}

	public refresh({ access_token, expires_in }: IWrappedToken) {
		this.access = access_token;

		let minExpirySeconds = expires_in >= 30 ? 30 : 0;

		let t = new Date();
		t.setSeconds(t.getSeconds() + expires_in - minExpirySeconds); // eg 30sec early

		this.expires = t;

		this.startCountdown();
	}

 	protected abstract emit(event: string | symbol, ...args: Array<any>): boolean;
	protected abstract on(event: string | symbol, listener: Function): this;

	private stopCountdown() {
		if (this.expiryTimeoutID !== null) {
			clearTimeout(this.expiryTimeoutID);
			this.expiryTimeoutID = null;
		}
	}

	private startCountdown() {
		if (this.expires !== null) {
			let delay: number = this.expires.getTime() - new Date().getTime();

			this.stopCountdown();

			if (delay > 0) {
				this.expiryTimeoutID = setTimeout(() => {
					this.emit('expired');
				}, delay);
			}
			else {
				this.emit('expired');
			}
		}
	}
}
