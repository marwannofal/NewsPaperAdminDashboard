using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NewsPaper.Data;
using Volo.Abp.DependencyInjection;

namespace NewsPaper.EntityFrameworkCore;

public class EntityFrameworkCoreNewsPaperDbSchemaMigrator
    : INewsPaperDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreNewsPaperDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolve the NewsPaperDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<NewsPaperDbContext>()
            .Database
            .MigrateAsync();
    }
}
