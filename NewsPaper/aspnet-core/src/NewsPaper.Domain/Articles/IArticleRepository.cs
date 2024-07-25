using System;
using Volo.Abp.Domain.Repositories;

namespace NewsPaper.Articles
{
    public interface IArticleRepository: IRepository<Article, Guid>
    {
        
    }
}