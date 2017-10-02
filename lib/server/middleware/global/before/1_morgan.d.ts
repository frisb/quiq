/// <reference types="express" />
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Response, NextFunction } from 'express';
import { IRequest } from '../../../contracts';
export declare class Morgan implements ExpressMiddlewareInterface {
    use(req: IRequest, res: Response, next?: NextFunction): any;
}
