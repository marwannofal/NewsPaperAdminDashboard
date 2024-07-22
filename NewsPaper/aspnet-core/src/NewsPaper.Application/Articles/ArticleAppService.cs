using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using NewsPaper.Permissions;
using System.Linq.Dynamic.Core; // Add this for dynamic LINQ support

namespace NewsPaper
{
    [Authorize(NewsPaperPermissions.Articles.Default)]
    public class ArticleAppService :
        CrudAppService<
            Article,
            ArticleDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateAndUpdateArticleDto>,
        IArticleAppService
    {
        private readonly IRepository<Author, Guid> _authorRepository;
        private readonly IRepository<Category, Guid> _categoryRepository;
        private readonly IRepository<Edition, Guid> _editionRepository;
        private readonly IRepository<Tag, Guid> _tagRepository;
        private readonly IRepository<ArticleTag, Guid> _articleTagRepository;

        public ArticleAppService(
            IRepository<Article, Guid> repository,
            IRepository<Author, Guid> authorRepository,
            IRepository<Category, Guid> categoryRepository,
            IRepository<Edition, Guid> editionRepository,
            IRepository<Tag, Guid> tagRepository,
            IRepository<ArticleTag, Guid> articleTagRepository)
            : base(repository)
        {
            _authorRepository = authorRepository;
            _categoryRepository = categoryRepository;
            _editionRepository = editionRepository;
            _tagRepository = tagRepository;
            _articleTagRepository = articleTagRepository;

            GetPolicyName = NewsPaperPermissions.Articles.Default;
            GetListPolicyName = NewsPaperPermissions.Articles.Default;
            CreatePolicyName = NewsPaperPermissions.Articles.Create;
            UpdatePolicyName = NewsPaperPermissions.Articles.Edit;
            DeletePolicyName = NewsPaperPermissions.Articles.Delete;
        }

        public override async Task<ArticleDto> GetAsync(Guid id)
        {
            var queryable = await Repository.GetQueryableAsync();

            var query = from article in queryable
                        join author in await _authorRepository.GetQueryableAsync() on article.AuthorId equals author.Id into authors
                        from author in authors.DefaultIfEmpty()
                        join category in await _categoryRepository.GetQueryableAsync() on article.CategoryId equals category.Id into categories
                        from category in categories.DefaultIfEmpty()
                        join edition in await _editionRepository.GetQueryableAsync() on article.EditionId1 equals edition.Id into editions
                        from edition in editions.DefaultIfEmpty()
                        where article.Id == id
                        select new { article, author, category, edition };

            var queryResult = await AsyncExecuter.FirstOrDefaultAsync(query);
            if (queryResult == null)
            {
                throw new EntityNotFoundException(typeof(Article), id);
            }

            var articleTagQueryable = await _articleTagRepository.GetQueryableAsync();
            var tagIds = await AsyncExecuter.ToListAsync(
                articleTagQueryable.Where(at => at.ArticleId == id).Select(at => at.TagId)
            );

            var tagQueryable = await _tagRepository.GetQueryableAsync();
            var tags = await AsyncExecuter.ToListAsync(
                tagQueryable.Where(t => tagIds.Contains(t.Id)).Select(t => t.Name)
            );

            var articleDto = ObjectMapper.Map<Article, ArticleDto>(queryResult.article);
            articleDto.AuthorName = queryResult.author?.FullName;
            articleDto.CategoryName = queryResult.category?.Name;
            articleDto.EditionName = queryResult.edition?.Name;
            articleDto.Tags = tags;

            return articleDto;
        }

        public override async Task<PagedResultDto<ArticleDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            var queryable = await Repository.GetQueryableAsync();

            var query = from article in queryable
                        join author in await _authorRepository.GetQueryableAsync() on article.AuthorId equals author.Id into authors
                        from author in authors.DefaultIfEmpty()
                        join category in await _categoryRepository.GetQueryableAsync() on article.CategoryId equals category.Id into categories
                        from category in categories.DefaultIfEmpty()
                        join edition in await _editionRepository.GetQueryableAsync() on article.EditionId1 equals edition.Id into editions
                        from edition in editions.DefaultIfEmpty()
                        select new { article, author, category, edition };

            // Apply sorting, paging and then execute the query
            query = query
                .OrderBy(NormalizeSorting(input.Sorting)) // using System.Linq.Dynamic.Core
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount);

            var queryResult = await AsyncExecuter.ToListAsync(query);

            var articleDtos = new List<ArticleDto>();
            foreach (var result in queryResult)
            {
                var articleTagQueryable = await _articleTagRepository.GetQueryableAsync();
                var tagIds = await AsyncExecuter.ToListAsync(
                    articleTagQueryable.Where(at => at.ArticleId == result.article.Id).Select(at => at.TagId)
                );

                var tagQueryable = await _tagRepository.GetQueryableAsync();
                var tags = await AsyncExecuter.ToListAsync(
                    tagQueryable.Where(t => tagIds.Contains(t.Id)).Select(t => t.Name)
                );

                var articleDto = ObjectMapper.Map<Article, ArticleDto>(result.article);
                articleDto.AuthorName = result.author?.FullName;
                articleDto.CategoryName = result.category?.Name;
                articleDto.EditionName = result.edition?.Name;
                articleDto.Tags = tags;

                articleDtos.Add(articleDto);
            }

            var totalCount = await Repository.GetCountAsync();

            return new PagedResultDto<ArticleDto>(
                totalCount,
                articleDtos
            );
        }

        public async Task<ListResultDto<AuthorLookupDto>> GetAuthorLookupAsync()
        {
            var authors = await _authorRepository.GetListAsync();
            return new ListResultDto<AuthorLookupDto>(
                ObjectMapper.Map<List<Author>, List<AuthorLookupDto>>(authors)
            );
        }

        public async Task<ListResultDto<CategoryLookupDto>> GetCategoryLookupAsync()
        {
            var categories = await _categoryRepository.GetListAsync();
            return new ListResultDto<CategoryLookupDto>(
                ObjectMapper.Map<List<Category>, List<CategoryLookupDto>>(categories)
            );
        }

        public async Task<ListResultDto<EditionLookupDto>> GetEditionLookupAsync()
        {
            var editions = await _editionRepository.GetListAsync();
            return new ListResultDto<EditionLookupDto>(
                ObjectMapper.Map<List<Edition>, List<EditionLookupDto>>(editions)
            );
        }

        public async Task<ListResultDto<TagLookupDto>> GetTagLookupAsync()
        {
            var tags = await _tagRepository.GetListAsync();
            return new ListResultDto<TagLookupDto>(
                ObjectMapper.Map<List<Tag>, List<TagLookupDto>>(tags)
            );
        }

        private static string NormalizeSorting(string sorting)
        {
            if (string.IsNullOrEmpty(sorting))
            {
                return $"article.{nameof(Article.Title)}";
            }

            if (sorting.Contains("authorName", StringComparison.OrdinalIgnoreCase))
            {
                return sorting.Replace("authorName", "author.FullName", StringComparison.OrdinalIgnoreCase);
            }

            return $"article.{sorting}";
        }
    }
}
