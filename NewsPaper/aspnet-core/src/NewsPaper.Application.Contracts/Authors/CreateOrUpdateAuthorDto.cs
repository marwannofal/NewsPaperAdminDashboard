using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace NewsPaper
{
    public class CreateOrUpdateAuthorDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        [StringLength(150)]
        public string FullName { get; set; }
        [Required]
        public string Bio { get; set; }   
        [Required]
        public Guid IdentityUserId { get; set; }
    }
}