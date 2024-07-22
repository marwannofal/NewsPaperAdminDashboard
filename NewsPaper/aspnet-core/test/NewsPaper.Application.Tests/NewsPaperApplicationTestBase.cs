using Volo.Abp.Modularity;

namespace NewsPaper;

public abstract class NewsPaperApplicationTestBase<TStartupModule> : NewsPaperTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
