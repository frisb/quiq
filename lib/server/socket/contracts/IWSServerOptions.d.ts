/// <reference types="ws" />
import { ServerOptions } from 'ws';
import { ISigningOptions } from '../../contracts';
export interface IWSServerOptions extends ServerOptions {
    signing?: ISigningOptions;
}
