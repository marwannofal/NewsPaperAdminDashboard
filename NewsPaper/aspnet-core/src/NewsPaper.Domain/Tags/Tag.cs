using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace NewsPaper
{
    public class Tag : FullAuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public virtual ICollection<ArticleTag> ArticleTags { get; set; } = new List<ArticleTag>();
    }
}