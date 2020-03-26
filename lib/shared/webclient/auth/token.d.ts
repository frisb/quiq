/// <reference types="node" />
import { IWrappedToken, IAuthToken } from '../contracts/index';
export declare abstract class AuthToken implements IAuthToken {
    access: string;
    expires: Date;
    protected expiryTimeoutID: NodeJS.Timer;
    constructor();
    get isValid(): boolean;
    refresh({ access_token, expires_in }: IWrappedToken): void;
    protected abstract emit(event: string | symbol, ...args: Array<any>): boolean;
    protected abstract on(event: string | symbol, listener: Function): this;
    private stopCountdown;
    private startCountdown;
}
