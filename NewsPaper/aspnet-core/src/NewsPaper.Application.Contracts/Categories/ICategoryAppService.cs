using System;
using System.Threading.Tasks;
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
        Task<bool> CategoryNameExistsAsync(string name, Guid? existingCategoryId = null);   
    }
}