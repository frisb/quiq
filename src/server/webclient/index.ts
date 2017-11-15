import { WebClientFactory, IRequestOptions, IRequestHeaders, IResponse, IWrappedToken } from '../../shared';
import { Token } from './token';
import { request } from './request';

export const { WebClient, JsonWebClient, AuthWebClient } = WebClientFactory(request, Token);
export * from '../../shared/webclient';

