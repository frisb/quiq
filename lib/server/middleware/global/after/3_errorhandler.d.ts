/// <reference types="express" />
import { ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
export declare class ErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, req: Request, res: Response, next: NextFunction): void;
}
