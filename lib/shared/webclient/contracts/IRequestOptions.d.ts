export interface IRequestOptions {
    url: string;
    method: string;
    headers?: {
        [key: string]: any;
    };
    body?: any;
}
