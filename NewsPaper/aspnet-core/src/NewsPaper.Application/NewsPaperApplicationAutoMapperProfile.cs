using System.Collections.Generic;
using System.Linq;
using AutoMapper;
namespace NewsPaper;
public class NewsPaperApplicationAutoMapperProfile : Profile
{
    public NewsPaperApplicationAutoMapperProfile()
    {
         // Article mappings
        CreateMap<Article, ArticleDto>()
            .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author != null ? src.Author.FullName : string.Empty))
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty))
            .ForMember(dest => dest.EditionName, opt => opt.MapFrom(src => src.Edition != null ? src.Edition.Name : string.Empty))
            .ForMember(dest => dest.TagNames, opt => opt.MapFrom(src => src.ArticleTags != null ? src.ArticleTags.Select(at => at.Tag != null ? at.Tag.Name : string.Empty).ToList() : new List<string>()));

        CreateMap<CreateAndUpdateArticleDto, Article>()
                .ForMember(dest => dest.VersionId, opt => opt.MapFrom(src => src.VersionId)); // Ensure mapping for VersionId


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
