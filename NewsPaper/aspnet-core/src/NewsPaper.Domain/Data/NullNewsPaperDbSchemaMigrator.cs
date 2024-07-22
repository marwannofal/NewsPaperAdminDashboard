using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace NewsPaper.Data;

/* This is used if database provider does't define
 * INewsPaperDbSchemaMigrator implementation.
 */
public class NullNewsPaperDbSchemaMigrator : INewsPaperDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
