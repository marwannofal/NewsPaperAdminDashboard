using System;
using System.Threading.Tasks;
using NewsPaper.Permissions;
using Volo.Abp;
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

        public async Task<bool> CategoryNameExistsAsync(string name, Guid? existingCategoryId = null)
        {
            return await Repository.AnyAsync(category => category.Name == name && (!existingCategoryId.HasValue || category.Id != existingCategoryId.Value));
        }


        public override async Task<CategoryDto> CreateAsync(CreateOrUpdateCategoryDto input)
        {
            if (await CategoryNameExistsAsync(input.Name))
            {
                throw new BusinessException("DuplicateCategoryName").WithData("Name", input.Name);
            }

            return await base.CreateAsync(input);
        }

        public override async Task<CategoryDto> UpdateAsync(Guid id, CreateOrUpdateCategoryDto input)
        {
            if (await CategoryNameExistsAsync(input.Name, id))
            {
                throw new BusinessException("DuplicateCategoryName").WithData("Name", input.Name);
            }

            return await base.UpdateAsync(id, input);
        }
    }
}