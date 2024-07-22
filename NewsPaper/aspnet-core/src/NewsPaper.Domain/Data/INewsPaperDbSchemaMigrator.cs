using System.Threading.Tasks;

namespace NewsPaper.Data;

public interface INewsPaperDbSchemaMigrator
{
    Task MigrateAsync();
}
