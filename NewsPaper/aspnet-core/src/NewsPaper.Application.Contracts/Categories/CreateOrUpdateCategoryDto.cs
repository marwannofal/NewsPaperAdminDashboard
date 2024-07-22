using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace NewsPaper
{
    public class CreateOrUpdateCategoryDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}