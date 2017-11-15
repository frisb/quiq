import { AuthToken } from '../../shared/webclient';
export declare class Token extends AuthToken {
    constructor();
    protected emit(event: string | symbol, ...args: Array<any>): boolean;
    protected on(event: string | symbol, listener: Function): this;
}
