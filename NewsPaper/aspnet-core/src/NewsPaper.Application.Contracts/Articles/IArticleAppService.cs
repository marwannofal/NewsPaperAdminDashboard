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
    }
}