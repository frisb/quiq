import { IRequestHeaders, RequestFunction, IRequestOptions, IResponse } from '../contracts';
import { AuthToken } from './token';
import { IWrappedToken } from '../contracts';
export declare function AuthWebClient<TAuthToken extends AuthToken>(request: RequestFunction, TokenClass: {
    new (): TAuthToken;
}): {
    new (userAgent?: string): {
        token: TAuthToken;
        authorize(url: string, body: any, token?: string): Promise<IWrappedToken>;
        get<T>(url: string, headers?: IRequestHeaders): Promise<IResponse<T>>;
        post<T>(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<T>>;
        put<T>(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<T>>;
        delete<T>(url: string, headers?: IRequestHeaders): Promise<IResponse<T>>;
        userAgent?: string;
        request(options: IRequestOptions): Promise<IResponse<any>>;
    };
};
