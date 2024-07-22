using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NewsPaper
{
    public interface ICategoryAppService : 
        ICrudAppService<
            CategoryDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateOrUpdateCategoryDto>
    {
        
    }
}