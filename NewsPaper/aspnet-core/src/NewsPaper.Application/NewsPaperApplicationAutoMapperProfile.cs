using AutoMapper;
namespace NewsPaper;
public class NewsPaperApplicationAutoMapperProfile : Profile
{
    public NewsPaperApplicationAutoMapperProfile()
    {
         // Article mappings
        CreateMap<Article, ArticleDto>();
        CreateMap<CreateAndUpdateArticleDto, Article>();

        // Category mappings
        CreateMap<Category, CategoryDto>();
        CreateMap<CreateOrUpdateCategoryDto, Category>();

        // Comment mappings
        CreateMap<Comment, CommentDto>();
        CreateMap<CreateOrUpdateCommentDto, Comment>();

        // Edition mappings
        CreateMap<Edition, EditionDto>();
        CreateMap<CreateOrUpdateEditionDto, Edition>();

        // Tag mappings
        CreateMap<Tag, TagDto>();
        CreateMap<CreateOrUpdateTagDto, Tag>();

        // User mappings
        CreateMap<Author, AuthorDto>();
        CreateMap<CreateOrUpdateAuthorDto, Author>();

    }
}
