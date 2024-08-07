import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
  { path: 'Categories', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
  { path: 'Tags', loadChildren: () => import('./tag/tag.module').then(m => m.TagModule) },
  { path: 'Editions', loadChildren: () => import('./edition/edition.module').then(m => m.EditionModule) },
  { path: 'Authors', loadChildren: () => import('./author/author.module').then(m => m.AuthorModule) },
  { path: 'Articles', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule) },
  { path: 'dashboards', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
