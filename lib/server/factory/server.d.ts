/// <reference types="express" />
/// <reference types="node" />
import * as http from 'http';
import * as https from 'https';
import { Application } from 'express';
export declare function create(app: Application, port: number | string, secureServerOptions?: https.ServerOptions): http.Server | https.Server;
