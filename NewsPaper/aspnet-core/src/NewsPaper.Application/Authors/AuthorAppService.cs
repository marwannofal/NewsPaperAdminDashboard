using System;
using System.Linq;
using System.Threading.Tasks;
using NewsPaper;
using NewsPaper.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;

public class AuthorAppService :
    CrudAppService<
        Author,
        AuthorDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateOrUpdateAuthorDto>,
    IAuthorAppService
{
    private readonly IRepository<IdentityUser, Guid> _identityUserRepository;

    public AuthorAppService(
        IRepository<Author, Guid> repository,
        IRepository<IdentityUser, Guid> identityUserRepository) : base(repository)
    {
        _identityUserRepository = identityUserRepository;
        GetPolicyName = NewsPaperPermissions.Authors.Default;
        GetListPolicyName = NewsPaperPermissions.Authors.Default;
        CreatePolicyName = NewsPaperPermissions.Authors.Create;
        UpdatePolicyName = NewsPaperPermissions.Authors.Edit;
        DeletePolicyName = NewsPaperPermissions.Authors.Delete;
    }

    public override async Task<PagedResultDto<AuthorDto>> GetListAsync(PagedAndSortedResultRequestDto input)
    {
        var result = await base.GetListAsync(input);

        var authorIds = result.Items.Select(a => a.Id).ToList();
        var authors = await Repository.GetListAsync(a => authorIds.Contains(a.Id));
        var identityUserIds = authors.Select(a => a.IdentityUserId).Distinct().ToList();
        var identityUsers = await _identityUserRepository.GetListAsync(u => identityUserIds.Contains(u.Id));

        foreach (var authorDto in result.Items)
        {
            var author = authors.First(a => a.Id == authorDto.Id);
            var identityUser = identityUsers.First(u => u.Id == author.IdentityUserId);

            
            authorDto.UserName = identityUser.UserName;
            authorDto.Email = identityUser.Email;
            authorDto.FirstName = identityUser.Name;
            authorDto.LastName = identityUser.Surname;
            authorDto.PhoneNumber = identityUser.PhoneNumber;
        }

        return result;
    }
    public override async Task<AuthorDto> GetAsync(Guid id)
    {
        var author = await Repository.GetAsync(id);

        var identityUser = author.IdentityUserId != Guid.Empty 
            ? await _identityUserRepository.GetAsync(author.IdentityUserId)
            : null;

        var authorDto = ObjectMapper.Map<Author, AuthorDto>(author);

        if (identityUser != null)
        {
            authorDto.UserName = identityUser.UserName;
            authorDto.Email = identityUser.Email;
            authorDto.FirstName = identityUser.Name;
            authorDto.LastName = identityUser.Surname;
            authorDto.PhoneNumber = identityUser.PhoneNumber;
        }

        return authorDto;
    }
}
