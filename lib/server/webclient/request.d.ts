import { IRequestOptions, IResponse } from '../../shared';
export declare function request({url, method, headers, body}: IRequestOptions): Promise<IResponse<string>>;
