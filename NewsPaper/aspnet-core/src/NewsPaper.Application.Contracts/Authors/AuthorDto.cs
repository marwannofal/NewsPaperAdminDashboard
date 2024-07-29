using System;
using Volo.Abp.Application.Dtos;

namespace NewsPaper
{
    public class AuthorDto : FullAuditedEntityDto<Guid>
    {
        public string FullName { get; set; }
        public string Bio { get; set; }   
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        
    }
}