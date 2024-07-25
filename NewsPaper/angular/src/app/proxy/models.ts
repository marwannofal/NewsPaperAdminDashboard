import type { FullAuditedEntityDto } from '@abp/ng.core';

export interface ArticleDto extends FullAuditedEntityDto<string> {
  title?: string;
  content?: string;
  publicationDate?: string;
  authorName?: string;
  categoryName?: string;
  editionName?: string;
  tagNames: string[];
  authorId?: string;
  categoryId?: string;
  versionId?: string;
  tagIds: string[];
}

export interface AuthorDto extends FullAuditedEntityDto<string> {
  fullName?: string;
  bio?: string;
  userName?: string;
  email?: string;
}

export interface CategoryDto extends FullAuditedEntityDto<string> {
  name?: string;
  description?: string;
  articles: ArticleDto[];
}

export interface CommentDto extends FullAuditedEntityDto<string> {
  content?: string;
  isApproved: boolean;
}

export interface CreateAndUpdateArticleDto extends FullAuditedEntityDto<string> {
  title: string;
  content: string;
  publicationDate?: string;
  authorId?: string;
  categoryId?: string;
  versionId?: string;
  tagIds: string[];
}

export interface CreateOrUpdateAuthorDto extends FullAuditedEntityDto<string> {
  fullName: string;
  bio: string;
  identityUserId: string;
}

export interface CreateOrUpdateCategoryDto extends FullAuditedEntityDto<string> {
  name: string;
  description?: string;
}

export interface CreateOrUpdateCommentDto extends FullAuditedEntityDto<string> {
  content: string;
  isApproved: boolean;
  userId?: string;
  articleId?: string;
}

export interface CreateOrUpdateEditionDto extends FullAuditedEntityDto<string> {
  name: string;
  publicationDate: string;
}

export interface CreateOrUpdateTagDto extends FullAuditedEntityDto<string> {
  name: string;
}

export interface EditionDto extends FullAuditedEntityDto<string> {
  name?: string;
  publicationDate?: string;
  articles: ArticleDto[];
}

export interface TagDto extends FullAuditedEntityDto<string> {
  name?: string;
}
