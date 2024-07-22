import type { CommentDto, CreateOrUpdateCommentDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  apiName = 'Default';
  

  create = (input: CreateOrUpdateCommentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CommentDto>({
      method: 'POST',
      url: '/api/app/comment',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/comment/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CommentDto>({
      method: 'GET',
      url: `/api/app/comment/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CommentDto>>({
      method: 'GET',
      url: '/api/app/comment',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateOrUpdateCommentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CommentDto>({
      method: 'PUT',
      url: `/api/app/comment/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
