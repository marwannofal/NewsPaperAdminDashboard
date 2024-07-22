using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NewsPaper
{
    public interface IAuthorAppService : 
        ICrudAppService<
            AuthorDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateOrUpdateAuthorDto>
    {
        
    }
}