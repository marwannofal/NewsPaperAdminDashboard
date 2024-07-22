using Volo.Abp.Modularity;

namespace NewsPaper;

/* Inherit from this class for your domain layer tests. */
public abstract class NewsPaperDomainTestBase<TStartupModule> : NewsPaperTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
