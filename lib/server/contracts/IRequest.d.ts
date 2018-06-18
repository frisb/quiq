import { Request } from 'express';
export interface IRequest extends Request {
    ID: string;
    ipv4: string;
    tokenData: any;
    authorizationBearer?: string;
    intercept?: any;
}
