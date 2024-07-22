using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace NewsPaper
{
    public class CommentAppService :
        CrudAppService<
            Comment,
            CommentDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateOrUpdateCommentDto>,
        ICommentAppService

    {
        public CommentAppService(IRepository<Comment, Guid> repository) : base(repository)
        {
        }
    }
}