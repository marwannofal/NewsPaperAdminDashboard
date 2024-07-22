using System;
using NewsPaper.Permissions;
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
    }
}