using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace NewsPaper
{
    public class CategoryDto : FullAuditedEntityDto<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<ArticleDto> Articles { get; set; }
    }
}