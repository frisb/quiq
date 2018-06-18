import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
export declare class Secure implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next?: NextFunction): any;
}
