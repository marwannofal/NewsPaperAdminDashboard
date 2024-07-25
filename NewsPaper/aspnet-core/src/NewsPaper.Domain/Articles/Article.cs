using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace NewsPaper
{
    public class Article : FullAuditedAggregateRoot<Guid>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PublicationDate { get; set; }
        public Guid AuthorId { get; set; } // Foreign key to User entity
        public Guid CategoryId { get; set; } // Foreign key to Category entity
        [ForeignKey("Edition")]
        public Guid VersionId { get; set; } // Foreign key to Edition entity

        // Navigation properties
        public virtual Author Author { get; set; }
        public virtual Category Category { get; set; }
        public virtual Edition Edition { get; set; }
        public virtual ICollection<ArticleTag> ArticleTags { get; set; } = new List<ArticleTag>();        
    }
}