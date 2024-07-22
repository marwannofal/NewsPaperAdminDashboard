using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace NewsPaper
{
    public class CreateOrUpdateCommentDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        public string Content { get; set; }
        public bool IsApproved { get; set; }
        public Guid UserId { get; set; } 
        public Guid ArticleId { get; set; } 
    }
}