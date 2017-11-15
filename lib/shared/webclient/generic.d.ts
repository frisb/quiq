import { IRequestHeaders, RequestFunction, IRequestOptions, IResponse } from './contracts/index';
export declare function WebClient(request: RequestFunction): {
    new (userAgent?: string): {
        get(url: string, headers?: IRequestHeaders): Promise<IResponse<any>>;
        post(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<any>>;
        put(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<any>>;
        delete(url: string, headers?: IRequestHeaders): Promise<IResponse<any>>;
        userAgent?: string;
        request(options: IRequestOptions): Promise<IResponse<any>>;
    };
};
