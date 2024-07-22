using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NewsPaper
{
    public interface ICommentAppService : 
        ICrudAppService<
            CommentDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateOrUpdateCommentDto>
    {
        
    }
}