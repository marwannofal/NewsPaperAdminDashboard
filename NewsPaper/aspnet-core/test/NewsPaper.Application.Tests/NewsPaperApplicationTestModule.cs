using Volo.Abp.Modularity;

namespace NewsPaper;

[DependsOn(
    typeof(NewsPaperApplicationModule),
    typeof(NewsPaperDomainTestModule)
)]
public class NewsPaperApplicationTestModule : AbpModule
{

}
