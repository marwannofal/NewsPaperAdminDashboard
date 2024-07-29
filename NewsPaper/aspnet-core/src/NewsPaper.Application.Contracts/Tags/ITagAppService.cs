using System;
using System.Threading.Tasks;
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
        Task<bool> TagNameExistsAsync(string name, Guid? existingTagId = null);   
    }
}