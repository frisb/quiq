import { IWrappedToken } from '../contracts';
export declare abstract class AuthToken {
    access: string;
    expires: Date;
    private expiryTimeoutID;
    constructor();
    readonly isValid: boolean;
    refresh({access_token, expires_in}: IWrappedToken): void;
    protected abstract emit(event: string | symbol, ...args: Array<any>): boolean;
    protected abstract on(event: string | symbol, listener: Function): this;
    private stopCountdown();
    private startCountdown();
}
