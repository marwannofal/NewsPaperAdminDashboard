using System;
using System.Threading.Tasks;
using NewsPaper.Permissions;
using Volo.Abp;
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

         public async Task<bool> TagNameExistsAsync(string name, Guid? existingTagId = null)
        {
            return await Repository.AnyAsync(tag => tag.Name == name && (!existingTagId.HasValue || tag.Id != existingTagId.Value));
        }

        public override async Task<TagDto> CreateAsync(CreateOrUpdateTagDto input)
        {
            if (await TagNameExistsAsync(input.Name))
            {
                throw new BusinessException("DuplicateTagName").WithData("Name", input.Name);
            }

            return await base.CreateAsync(input);
        }

        public override async Task<TagDto> UpdateAsync(Guid id, CreateOrUpdateTagDto input)
        {
            if (await TagNameExistsAsync(input.Name, id))
            {
                throw new BusinessException("DuplicateTagName").WithData("Name", input.Name);
            }

            return await base.UpdateAsync(id, input);
        }
    }
}