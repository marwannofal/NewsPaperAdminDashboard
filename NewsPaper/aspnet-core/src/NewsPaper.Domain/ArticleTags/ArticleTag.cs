using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NewsPaper
{
    public class ArticleTag : FullAuditedAggregateRoot<Guid>
    {
        public Guid ArticleId { get; set; }
        public Article Article { get; set; }
        
        public Guid TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
