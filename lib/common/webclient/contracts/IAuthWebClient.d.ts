import { IWrappedToken } from './IWrappedToken';
export interface IAuthWebClient<TAuthToken> {
    token: TAuthToken;
    authorize(url: string, body: any, token?: string): Promise<IWrappedToken>;
}
