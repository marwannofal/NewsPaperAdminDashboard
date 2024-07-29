using System;
using System.Threading.Tasks;
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
        Task<bool> EditionNameExistsAsync(string name, Guid? existingEditionId = null);   

    }
}