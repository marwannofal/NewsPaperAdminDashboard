using NewsPaper.Samples;
using Xunit;

namespace NewsPaper.EntityFrameworkCore.Applications;

[Collection(NewsPaperTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<NewsPaperEntityFrameworkCoreTestModule>
{

}
