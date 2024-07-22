using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace NewsPaper
{
    public class ArticleDto : FullAuditedEntityDto<Guid>
    {
        public string Title { get; set; }
        public DateTime PublicationDate { get; set; }
        public string AuthorName { get; set; }
        public string CategoryName { get; set; }
        public string EditionName { get; set; }
        public ICollection<string> Tags { get; set; }
        public string Content { get; set; }
    }
}