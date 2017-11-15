import { IResponse } from './IResponse';
import { IRequestOptions } from './IRequestOptions';
export declare type RequestFunction = (options: IRequestOptions) => Promise<IResponse<any>>;
