using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace NewsPaper
{
    public class CreateOrUpdateTagDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
    }
}