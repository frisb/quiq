import { WebClientFactory, IRequestOptions, IRequestHeaders, IResponse, IWrappedToken } from '../../common';
import { Token } from './Token';
import { request } from './request';

export const { WebClient, JsonWebClient, AuthWebClient } = WebClientFactory(request, Token);
export * from '../../common/webclient';

