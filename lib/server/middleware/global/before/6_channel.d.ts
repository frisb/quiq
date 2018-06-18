import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Response, NextFunction } from 'express';
import { IRequest } from '../../../contracts';
export declare class Channel implements ExpressMiddlewareInterface {
    use(req: IRequest, res: Response, next: NextFunction): Promise<void>;
}
