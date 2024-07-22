using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace NewsPaper
{
    public class EditionDto : FullAuditedEntityDto<Guid>
    {
        public string Name { get; set; }
        public DateTime PublicationDate { get; set; }
        public ICollection<ArticleDto> Articles { get; set; }
    }
}