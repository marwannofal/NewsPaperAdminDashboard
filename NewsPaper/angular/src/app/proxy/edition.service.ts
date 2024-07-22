import type { CreateOrUpdateEditionDto, EditionDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditionService {
  apiName = 'Default';
  

  create = (input: CreateOrUpdateEditionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EditionDto>({
      method: 'POST',
      url: '/api/app/edition',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/edition/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EditionDto>({
      method: 'GET',
      url: `/api/app/edition/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<EditionDto>>({
      method: 'GET',
      url: '/api/app/edition',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateOrUpdateEditionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EditionDto>({
      method: 'PUT',
      url: `/api/app/edition/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
