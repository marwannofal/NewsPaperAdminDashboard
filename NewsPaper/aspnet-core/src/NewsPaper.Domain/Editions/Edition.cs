using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace NewsPaper
{
    public class Edition : FullAuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public DateTime PublicationDate { get; set; }

        // Navigation properties
        public virtual ICollection<Article> Articles { get; set; } = new List<Article>();
    }
}