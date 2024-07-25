using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using NewsPaper.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace NewsPaper.Articles
{
    public class ArticleRepository : EfCoreRepository<NewsPaperDbContext, Article, Guid>, IArticleRepository
    {
        public ArticleRepository(IDbContextProvider<NewsPaperDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public override IQueryable<Article> WithDetails()
        {
            return GetQueryable()
                .Include(a => a.ArticleTags)
                    .ThenInclude(at => at.Tag)
                .Include(a => a.Author)
                .Include(a => a.Category)
                .Include(a => a.Edition);
        }
    }
}
