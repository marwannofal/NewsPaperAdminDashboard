import type { AuthorDto, CreateOrUpdateAuthorDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  apiName = 'Default';
  

  create = (input: CreateOrUpdateAuthorDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AuthorDto>({
      method: 'POST',
      url: '/api/app/author',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/author/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AuthorDto>({
      method: 'GET',
      url: `/api/app/author/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<AuthorDto>>({
      method: 'GET',
      url: '/api/app/author',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateOrUpdateAuthorDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AuthorDto>({
      method: 'PUT',
      url: `/api/app/author/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
