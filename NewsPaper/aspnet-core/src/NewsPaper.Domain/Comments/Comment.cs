using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NewsPaper
{
    public class Comment : FullAuditedAggregateRoot<Guid>
    {
        public Guid UserId { get; set; } // Foreign key to User entity
        public Guid ArticleId { get; set; } // Foreign key to Article entity
        public string Content { get; set; }
        public bool IsApproved { get; set; }

        // Navigation properties
        public virtual Author Author { get; set; }
        public virtual Article Article { get; set; }
    }
}