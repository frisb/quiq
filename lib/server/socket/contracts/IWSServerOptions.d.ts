import { IServerOptions } from 'ws';
import { ISigningOptions } from '../../contracts';
export interface IWSServerOptions extends IServerOptions {
    signing?: ISigningOptions;
}
