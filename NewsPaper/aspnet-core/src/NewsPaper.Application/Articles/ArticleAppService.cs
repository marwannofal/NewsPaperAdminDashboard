using System;
using NewsPaper.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace NewsPaper
{
    public class ArticleAppService :
    CrudAppService<
        Article,
        ArticleDto, 
        Guid, 
        PagedAndSortedResultRequestDto, 
        CreateAndUpdateArticleDto>, 
    IArticleAppService 
    {
        public ArticleAppService(IRepository<Article, Guid> repository) : base(repository)
        {
            GetPolicyName = NewsPaperPermissions.Articles.Default;
            GetListPolicyName = NewsPaperPermissions.Articles.Default;
            CreatePolicyName = NewsPaperPermissions.Articles.Create;
            UpdatePolicyName = NewsPaperPermissions.Articles.Edit;
            DeletePolicyName = NewsPaperPermissions.Articles.Delete;
        }
    }
}