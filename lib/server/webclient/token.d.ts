import { AuthToken } from '../../shared/webclient/auth/token';
export declare class Token extends AuthToken {
    protected emit(event: string | symbol, ...args: Array<any>): boolean;
    protected on(event: string | symbol, listener: Function): this;
}
