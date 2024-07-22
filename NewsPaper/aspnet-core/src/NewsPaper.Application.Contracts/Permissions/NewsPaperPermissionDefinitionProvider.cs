using NewsPaper.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace NewsPaper.Permissions;

public class NewsPaperPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var NewsPaperGroup = context.AddGroup(NewsPaperPermissions.GroupName);
        
        NewsPaperGroup.AddPermission(NewsPaperPermissions.Dashboard.Host, L("Permission:Dashboard"), MultiTenancySides.Host);
        NewsPaperGroup.AddPermission(NewsPaperPermissions.Dashboard.Tenant, L("Permission:Dashboard"), MultiTenancySides.Tenant);

        var CategoriesPermission = NewsPaperGroup.AddPermission(NewsPaperPermissions.Categories.Default, L("Permission:Categories"));
        CategoriesPermission.AddChild(NewsPaperPermissions.Categories.Create, L("Permission:Categories.Create"));
        CategoriesPermission.AddChild(NewsPaperPermissions.Categories.Edit, L("Permission:Categories.Edit"));
        CategoriesPermission.AddChild(NewsPaperPermissions.Categories.Delete, L("Permission:Categories.Delete"));

        var TagsPermission = NewsPaperGroup.AddPermission(NewsPaperPermissions.Tags.Default, L("Permission:Tags"));
        TagsPermission.AddChild(NewsPaperPermissions.Tags.Create, L("Permission:Tags.Create"));
        TagsPermission.AddChild(NewsPaperPermissions.Tags.Edit, L("Permission:Tags.Edit"));
        TagsPermission.AddChild(NewsPaperPermissions.Tags.Delete, L("Permission:Tags.Delete"));

        var EditionsPermission = NewsPaperGroup.AddPermission(NewsPaperPermissions.Editions.Default, L("Permission:Editions"));
        EditionsPermission.AddChild(NewsPaperPermissions.Editions.Create, L("Permission:Editions.Create"));
        EditionsPermission.AddChild(NewsPaperPermissions.Editions.Edit, L("Permission:Editions.Edit"));
        EditionsPermission.AddChild(NewsPaperPermissions.Editions.Delete, L("Permission:Editions.Delete"));

        var AuthorsPermission = NewsPaperGroup.AddPermission(NewsPaperPermissions.Authors.Default, L("Permission:Authors"));
        AuthorsPermission.AddChild(NewsPaperPermissions.Authors.Create, L("Permission:Authors.Create"));
        AuthorsPermission.AddChild(NewsPaperPermissions.Authors.Edit, L("Permission:Authors.Edit"));
        AuthorsPermission.AddChild(NewsPaperPermissions.Authors.Delete, L("Permission:Authors.Delete"));

        var ArticlesPermission = NewsPaperGroup.AddPermission(NewsPaperPermissions.Articles.Default, L("Permission:Articles"));
        ArticlesPermission.AddChild(NewsPaperPermissions.Articles.Create, L("Permission:Articles.Create"));
        ArticlesPermission.AddChild(NewsPaperPermissions.Articles.Edit, L("Permission:Articles.Edit"));
        ArticlesPermission.AddChild(NewsPaperPermissions.Articles.Delete, L("Permission:Articles.Delete"));


    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<NewsPaperResource>(name);
    }
}
