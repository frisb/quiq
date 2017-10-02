/// <reference types="express" />
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
export declare class StaticPublic implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next?: NextFunction): any;
}
