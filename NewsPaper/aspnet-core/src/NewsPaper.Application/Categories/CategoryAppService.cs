using System;
using NewsPaper.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace NewsPaper
{
    public class CategoryAppService :
        CrudAppService<
            Category,
            CategoryDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateOrUpdateCategoryDto>,
        ICategoryAppService

    {
        public CategoryAppService(IRepository<Category, Guid> repository) : base(repository)
        {
            GetPolicyName = NewsPaperPermissions.Categories.Default;
            GetListPolicyName = NewsPaperPermissions.Categories.Default;
            CreatePolicyName = NewsPaperPermissions.Categories.Create;
            UpdatePolicyName = NewsPaperPermissions.Categories.Edit;
            DeletePolicyName = NewsPaperPermissions.Categories.Delete;
        }
    }
}