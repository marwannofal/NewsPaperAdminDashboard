using Volo.Abp.Modularity;

namespace NewsPaper;

[DependsOn(
    typeof(NewsPaperDomainModule),
    typeof(NewsPaperTestBaseModule)
)]
public class NewsPaperDomainTestModule : AbpModule
{

}
