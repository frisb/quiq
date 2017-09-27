import { IRequestHeaders } from './IRequestHeaders';
import { IResponse } from './IResponse';
export interface IWebClient {
    get(url: string, headers?: IRequestHeaders): Promise<IResponse<string>>;
    post(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<string>>;
    put(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<string>>;
    delete(url: string, headers?: IRequestHeaders): Promise<IResponse<string>>;
}
