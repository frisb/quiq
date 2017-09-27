import { IResponse } from './IResponse';
import { IRequestOptions } from './IRequestOptions';

export type RequestFunction = (options: IRequestOptions) => Promise<IResponse<any>>
