import { WebClientFactory, IRequestOptions, IRequestHeaders, IResponse, IWrappedToken } from '../../common';
import { Token } from './token';
import { request } from './request';

export const { WebClient, JsonWebClient, AuthWebClient } = WebClientFactory(request, Token);
export * from '../../common/webclient';

