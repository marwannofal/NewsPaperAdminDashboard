using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Uow;
using NewsPaper.Permissions;
using Volo.Abp.Domain.Entities;
using Microsoft.Extensions.Logging;
using Volo.Abp;
using NewsPaper.Articles;
using Microsoft.EntityFrameworkCore;

namespace NewsPaper
{
    [Authorize(NewsPaperPermissions.Articles.Default)]
    public class ArticleAppService :
        CrudAppService<
            Article, // The Article entity
            ArticleDto, // Used to show articles
            Guid, // Primary key of the article entity
            PagedAndSortedResultRequestDto, // Used for paging/sorting
            CreateAndUpdateArticleDto>, // Used to create/update an article
        IArticleAppService // Implement the IArticleAppService
    {
        private readonly IArticleRepository _articleRepository; // Use custom repository
        private readonly IRepository<ArticleTag, Guid> _articleTagRepository;
        private readonly ILogger<ArticleAppService> _logger;
        
        public ArticleAppService(
            IArticleRepository articleRepository,
            IRepository<ArticleTag, Guid> articleTagRepository,
            ILogger<ArticleAppService> logger
        ) : base(articleRepository)
        {
            _articleRepository = articleRepository;
            _articleTagRepository = articleTagRepository;
            _logger = logger;
        }

        [UnitOfWork]
        public override async Task<ArticleDto> GetAsync(Guid id)
        {
            var query = _articleRepository
                .WithDetails();

            var article = await query.FirstOrDefaultAsync(a => a.Id == id);

            if (article == null)
            {
                throw new EntityNotFoundException(typeof(Article), id);
            }

            // Log Edition details
            if (article.Edition == null)
            {
                _logger.LogWarning("Edition not loaded for article {ArticleId}", id);
            }
            else
            {
                _logger.LogInformation("Loaded edition {EditionName} for article {ArticleId}", article.Edition.Name, id);
            }

            var articleDto = ObjectMapper.Map<Article, ArticleDto>(article);

            // Log mapped EditionName
            _logger.LogInformation("Mapped edition name: {EditionName}", articleDto.EditionName);

            return articleDto;
        }

        [UnitOfWork]
        public override async Task<PagedResultDto<ArticleDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            var query = _articleRepository
                .WithDetails();

            query = query.OrderBy(a => a.PublicationDate); // Apply OrderBy after awaiting the task

            var totalCount = await AsyncExecuter.CountAsync(query);

            var articles = await AsyncExecuter.ToListAsync(
                query.PageBy(input.SkipCount, input.MaxResultCount)
            );

            var firstArticle = articles.FirstOrDefault();
            if (firstArticle?.Edition == null)
            {
                _logger.LogWarning("Edition not loaded for the first article in the list");
            }
            else
            {
                _logger.LogInformation("Loaded edition {EditionName} for the first article in the list", firstArticle?.Edition?.Name);
            }

            var articleDtos = ObjectMapper.Map<List<Article>, List<ArticleDto>>(articles);

            // Log mapped EditionName for the first article DTO
            var firstArticleDto = articleDtos.FirstOrDefault();
            _logger.LogInformation("Mapped edition name for the first article DTO: {EditionName}", firstArticleDto?.EditionName);

            return new PagedResultDto<ArticleDto>(
                totalCount,
                articleDtos
            );
        }

        [UnitOfWork]
        public override async Task<ArticleDto> CreateAsync(CreateAndUpdateArticleDto input)
        {
            try
            {
                var article = ObjectMapper.Map<CreateAndUpdateArticleDto, Article>(input);

                await _articleRepository.InsertAsync(article);

                foreach (var tagId in input.TagIds)
                {
                    var articleTag = new ArticleTag
                    {
                        ArticleId = article.Id,
                        TagId = tagId
                    };

                    await _articleTagRepository.InsertAsync(articleTag);
                }

                await CurrentUnitOfWork.SaveChangesAsync(); // Ensure all changes are saved

                return ObjectMapper.Map<Article, ArticleDto>(article);
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex, "An error occurred while creating the article");
                throw new UserFriendlyException("An internal error occurred during your request!");
            }
        }

        [UnitOfWork]
        public override async Task<ArticleDto> UpdateAsync(Guid id, CreateAndUpdateArticleDto input)
        {
            try
            {
                // // Fetch the existing article from the repository
                // var article = await _articleRepository.GetAsync(id);

                // // If the article does not exist, throw an exception
                // if (article == null)
                // {
                //     throw new EntityNotFoundException(typeof(Article), id);
                // }

                // // Manually update each property to avoid issues with EF Core tracking
                // article.Title = input.Title;
                // article.Content = input.Content;
                // article.PublicationDate = input.PublicationDate;
                // article.AuthorId = input.AuthorId;
                // article.CategoryId = input.CategoryId;
                // article.VersionId = input.VersionId; // Ensure this property is correctly set

                // // Delete existing ArticleTags associated with this article
                // var existingTags = await _articleTagRepository.GetListAsync(at => at.ArticleId == id);
                // foreach (var tag in existingTags)
                // {
                //     await _articleTagRepository.DeleteAsync(tag);
                // }

                // // Add new ArticleTags
                // foreach (var tagId in input.TagIds)
                // {
                //     var articleTag = new ArticleTag
                //     {
                //         ArticleId = id,
                //         TagId = tagId
                //     };

                //     await _articleTagRepository.InsertAsync(articleTag);
                // }

                // // Save changes to the unit of work
                // await CurrentUnitOfWork.SaveChangesAsync(); // Ensure all changes are saved

                // // Map the updated article entity back to a DTO
                // return ObjectMapper.Map<Article, ArticleDto>(article);
                var article = await _articleRepository.GetAsync(id);
                if (article == null)
                {
                    throw new EntityNotFoundException(typeof(Article), id);
                }
                article.Title = input.Title;
                article.Content = input.Content;
                article.PublicationDate = input.PublicationDate;
                article.AuthorId = input.AuthorId;
                article.CategoryId = input.CategoryId;
                article.VersionId = input.VersionId;

                var existingTags = await _articleTagRepository.GetListAsync(at => at.ArticleId == id);
                foreach (var tag in existingTags)
                {
                    if (!input.TagIds.Contains(tag.TagId))
                    {
                        await _articleTagRepository.DeleteAsync(tag);
                    }
                }

                // Add new ArticleTags
                foreach (var tagId in input.TagIds)
                {
                    // Check if the tag already exists
                    if (!existingTags.Any(et => et.TagId == tagId))
                    {
                        var articleTag = new ArticleTag
                        {
                            ArticleId = id,
                            TagId = tagId
                        };

                        await _articleTagRepository.InsertAsync(articleTag);
                    }
                }
                await CurrentUnitOfWork.SaveChangesAsync(); 
                return ObjectMapper.Map<Article, ArticleDto>(article);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the article with id {ArticleId}", id);
                throw new UserFriendlyException("An internal error occurred during your request!");
            }
        }
    }
}
