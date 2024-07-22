using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NewsPaper
{
    public interface ITagAppService : 
        ICrudAppService<
            TagDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateOrUpdateTagDto>
    {
        
    }
}