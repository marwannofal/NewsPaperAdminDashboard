using System;
using NewsPaper.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace NewsPaper
{
    public class TagService :
        CrudAppService<
            Tag,
            TagDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateOrUpdateTagDto>,
        ITagAppService

    {
        public TagService(IRepository<Tag, Guid> repository) : base(repository)
        {
            GetPolicyName = NewsPaperPermissions.Tags.Default;
            GetListPolicyName = NewsPaperPermissions.Tags.Default;
            CreatePolicyName = NewsPaperPermissions.Tags.Create;
            UpdatePolicyName = NewsPaperPermissions.Tags.Edit;
            DeletePolicyName = NewsPaperPermissions.Tags.Delete;
        }
    }
}