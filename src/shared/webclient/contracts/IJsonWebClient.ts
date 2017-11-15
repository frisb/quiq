import { IRequestHeaders } from './IRequestHeaders';
import { IResponse } from './IResponse';

export interface IJsonWebClient {
	get<T>(url: string, headers?: IRequestHeaders): Promise<IResponse<T>>;
	post<T>(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<T>>;
	put<T>(url: string, body: any, headers?: IRequestHeaders): Promise<IResponse<T>>;
	delete<T>(url: string, headers?: IRequestHeaders): Promise<IResponse<T>>;
}
