using System;
using Volo.Abp.Application.Dtos;

namespace NewsPaper
{
    public class CommentDto : FullAuditedEntityDto<Guid>
    {
        public string Content { get; set; }
        public bool IsApproved { get; set; }
    }
}