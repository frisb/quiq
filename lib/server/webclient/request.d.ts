import { IRequestOptions, IResponse } from '../../common';
export declare function request({url, method, headers, body}: IRequestOptions): Promise<IResponse<string>>;
