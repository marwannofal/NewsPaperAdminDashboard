using Xunit;

namespace NewsPaper.EntityFrameworkCore;

[CollectionDefinition(NewsPaperTestConsts.CollectionDefinitionName)]
public class NewsPaperEntityFrameworkCoreCollection : ICollectionFixture<NewsPaperEntityFrameworkCoreFixture>
{

}
