using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace NewsPaper
{
    public class ArticleDto : FullAuditedEntityDto<Guid>
    {
        public string Title { get; set; }
        public string Content { get; set; } 
        public DateTime PublicationDate { get; set; }
        public string AuthorName { get; set; }
        public string CategoryName { get; set; }
        public string EditionName { get; set; }
        public List<string> TagNames { get; set; }       
        public Guid AuthorId { get; set; } 
        public Guid CategoryId { get; set; } 
        public Guid VersionId { get; set; } 
        public List<Guid> TagIds { get; set; }
    }
}