using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace NewsPaper
{
    public class CreateAndUpdateArticleDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        [StringLength(128)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }
        public DateTime PublicationDate { get; set; }
        public Guid AuthorId { get; set; } 
        public Guid CategoryId { get; set; } 
        public Guid EditionId1 { get; set; } 
        public List<Guid> TagIds { get; set; } = new List<Guid>();
    }
}