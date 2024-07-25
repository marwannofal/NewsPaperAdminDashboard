using System;
using Volo.Abp.Domain.Entities;

namespace NewsPaper
{
    public class ArticleTag :Entity<Guid>
    {
        public Guid ArticleId { get; set; }
        public Article Article { get; set; }

        public Guid TagId { get; set; }
        public Tag Tag { get; set; }
    }
}