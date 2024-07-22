using System;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace NewsPaper
{
    public class Author : FullAuditedAggregateRoot<Guid>
    {
        public string FullName { get; set; }
        public string Bio { get; set; }

        // Foreign key to IdentityUser
        public Guid IdentityUserId { get; set; }

        // Navigation property to IdentityUser
        public virtual IdentityUser IdentityUser { get; set; }
    }
}