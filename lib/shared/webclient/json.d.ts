import { IRequestHeaders, RequestFunction, IRequestOptions, IResponse } from './contracts/index';
export declare function JsonWebClient(request: RequestFunction): {
    new (userAgent?: string): {
        get<T>(url: string, headers?: IRequestHeaders): Promise<IResponse<T>>;
        post<T>(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<T>>;
        put<T>(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<T>>;
        delete<T>(url: string, headers?: IRequestHeaders): Promise<IResponse<T>>;
        userAgent?: string;
        request(options: IRequestOptions): Promise<IResponse<any>>;
    };
};
