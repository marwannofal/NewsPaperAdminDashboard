using System;
using Volo.Abp.Application.Dtos;

namespace NewsPaper
{
    public class TagDto : FullAuditedEntityDto<Guid>
    {
        public string Name { get; set; }
    }
}