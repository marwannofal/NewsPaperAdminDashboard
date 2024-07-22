using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace NewsPaper
{
    public class Category : FullAuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }

        // Navigation properties
        public virtual ICollection<Article> Articles { get; set; } = new List<Article>();
    }
}