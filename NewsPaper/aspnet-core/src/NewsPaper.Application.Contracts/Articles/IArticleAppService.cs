using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NewsPaper
{
    public interface IArticleAppService : 
        ICrudAppService< 
            ArticleDto, // DTO for displaying categories
            Guid,   // Primary key 
            PagedAndSortedResultRequestDto, // DTO for paging and sorting
            CreateAndUpdateArticleDto> // DTO for creating/updating 
    {
        Task<ListResultDto<AuthorLookupDto>> GetAuthorLookupAsync();
        Task<ListResultDto<CategoryLookupDto>> GetCategoryLookupAsync();
        Task<ListResultDto<EditionLookupDto>> GetEditionLookupAsync();
        Task<ListResultDto<TagLookupDto>> GetTagLookupAsync();
    }
}