using System;
using System.Threading.Tasks;
using NewsPaper.Permissions;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace NewsPaper
{
    public class EditionAppService :
        CrudAppService<
            Edition,
            EditionDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateOrUpdateEditionDto>,
        IEditionAppService
    {
        public EditionAppService(IRepository<Edition, Guid> repository) : base(repository)
        {
            GetPolicyName = NewsPaperPermissions.Editions.Default;
            GetListPolicyName = NewsPaperPermissions.Editions.Default;
            CreatePolicyName = NewsPaperPermissions.Editions.Create;
            UpdatePolicyName = NewsPaperPermissions.Editions.Edit;
            DeletePolicyName = NewsPaperPermissions.Editions.Delete;
        }

        public async Task<bool> EditionNameExistsAsync(string name, Guid? existingEditionId = null)
        {
            return await Repository.AnyAsync(edition => edition.Name == name && (!existingEditionId.HasValue || edition.Id != existingEditionId.Value));
        }
        public override async Task<EditionDto> CreateAsync(CreateOrUpdateEditionDto input)
        {
            if (await EditionNameExistsAsync(input.Name))
            {
                throw new BusinessException("DuplicateEditionName").WithData("Name", input.Name);
            }

            return await base.CreateAsync(input);
        }

        public override async Task<EditionDto> UpdateAsync(Guid id, CreateOrUpdateEditionDto input)
        {
            if (await EditionNameExistsAsync(input.Name, id))
            {
                throw new BusinessException("DuplicateEditionName").WithData("Name", input.Name);
            }

            return await base.UpdateAsync(id, input);
        }
    }
}