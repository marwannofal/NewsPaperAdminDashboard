import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fa fa-tachometer',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/dashboard',
        name: '::Menu:Dashboard',
        iconClass: 'fas fa-chart-line',
        order: 2,
        layout: eLayoutType.application,
        requiredPolicy: 'Newspaper.Dashboard.Host || AbpAccount.SettingManagement',
      },
      {
        path: '/news-paper',
        name: '::Menu:NewsPaper',
        iconClass: 'fas fa-newspaper',
        order: 101,
        layout: eLayoutType.application,
      },
      {
        path: '/Categories',
        name: '::Menu:Categories',
        iconClass: 'bi bi-collection',
        parentName: '::Menu:NewsPaper',
        layout: eLayoutType.application,
        requiredPolicy: 'NewsPaper.Categories'
      },
      {
        path: '/Tags',
        name: '::Menu:Tags',
        parentName: '::Menu:NewsPaper',
        iconClass: 'bi bi-tag',
        layout: eLayoutType.application,
        requiredPolicy: 'NewsPaper.Tags',
      },
      {
        path: '/Editions',
        name: '::Menu:Editions',
        iconClass: 'bi bi-files',
        parentName: '::Menu:NewsPaper',
        layout: eLayoutType.application,
        requiredPolicy: 'NewsPaper.Editions',
      },
      {
        path: '/Authors',
        name: '::Menu:Authors',
        iconClass: 'bi bi-file-person',
        parentName: '::Menu:NewsPaper',
        layout: eLayoutType.application,
        requiredPolicy: 'NewsPaper.Authors',
      },
      {
        path: '/Articles',
        name: '::Menu:Articles',
        iconClass: 'bi bi-file-post',
        parentName: '::Menu:NewsPaper',
        layout: eLayoutType.application,
        requiredPolicy: 'NewsPaper.Articles',
      },         
    ]);
  };
}
