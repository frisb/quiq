/// <reference types="node" />
import http from 'http';
import https from 'https';
import { Application } from 'express';
export declare function create(app: Application, port: number | string, secureServerOptions?: https.ServerOptions): http.Server | https.Server;
