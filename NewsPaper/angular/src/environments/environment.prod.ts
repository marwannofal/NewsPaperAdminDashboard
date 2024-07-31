import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'NewsPaper',
    logoUrl: 'assets/Images/logo/logoNews.png',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44347/',
    redirectUri: baseUrl,
    clientId: 'NewsPaper_App',
    responseType: 'code',
    scope: 'offline_access NewsPaper',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44347',
      rootNamespace: 'NewsPaper',
    },
  },
} as Environment;
