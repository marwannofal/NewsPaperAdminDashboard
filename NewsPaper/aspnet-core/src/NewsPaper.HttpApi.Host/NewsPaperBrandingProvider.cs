using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace NewsPaper;

[Dependency(ReplaceServices = true)]
public class NewsPaperBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "NewsPaper";
}
