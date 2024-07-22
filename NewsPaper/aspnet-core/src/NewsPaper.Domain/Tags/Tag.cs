using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace NewsPaper
{
    public class Tag : FullAuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
    }
}