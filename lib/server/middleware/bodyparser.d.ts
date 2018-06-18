import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
export declare class JsonBodyParser implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next?: NextFunction): any;
}
export declare class UrlEncodedBodyParser implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next?: NextFunction): any;
}
