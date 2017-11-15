import { IRequestOptions, IResponse, RequestFunction } from './contracts/index';
export declare function AbstractWebClient(request: RequestFunction): {
    new (userAgent?: string): {
        userAgent?: string;
        request(options: IRequestOptions): Promise<IResponse<any>>;
    };
};
