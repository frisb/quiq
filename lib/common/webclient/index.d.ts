import { RequestFunction, IRequestOptions, IRequestHeaders, IResponse, IWrappedToken } from './contracts';
import { AuthToken } from './auth/token';
export * from './contracts';
export { AuthToken };
export declare function WebClientFactory(request: RequestFunction, AuthTokenClass?: {
    new (): AuthToken;
}): {
    WebClient: {
        new (userAgent?: string): {
            get(url: string, headers?: IRequestHeaders): Promise<IResponse<any>>;
            post(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<any>>;
            put(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<any>>;
            delete(url: string, headers?: IRequestHeaders): Promise<IResponse<any>>;
            userAgent?: string;
            request(options: IRequestOptions): Promise<IResponse<any>>;
        };
    };
    JsonWebClient: {
        new (userAgent?: string): {
            get<T>(url: string, headers?: IRequestHeaders): Promise<IResponse<T>>;
            post<T>(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<T>>;
            put<T>(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<T>>;
            delete<T>(url: string, headers?: IRequestHeaders): Promise<IResponse<T>>;
            userAgent?: string;
            request(options: IRequestOptions): Promise<IResponse<any>>;
        };
    };
    AuthWebClient: {
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
};
