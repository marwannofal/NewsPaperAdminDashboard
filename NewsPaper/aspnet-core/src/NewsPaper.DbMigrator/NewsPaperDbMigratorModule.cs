using NewsPaper.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace NewsPaper.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(NewsPaperEntityFrameworkCoreModule),
    typeof(NewsPaperApplicationContractsModule)
    )]
public class NewsPaperDbMigratorModule : AbpModule
{
}
