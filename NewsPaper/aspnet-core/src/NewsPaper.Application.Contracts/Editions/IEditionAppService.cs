using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NewsPaper
{
    public interface IEditionAppService : 
        ICrudAppService<
            EditionDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateOrUpdateEditionDto>
    {
        
    }
}