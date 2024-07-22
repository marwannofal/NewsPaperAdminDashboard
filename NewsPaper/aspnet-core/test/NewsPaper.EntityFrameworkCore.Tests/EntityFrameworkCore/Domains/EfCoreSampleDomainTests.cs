using NewsPaper.Samples;
using Xunit;

namespace NewsPaper.EntityFrameworkCore.Domains;

[Collection(NewsPaperTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<NewsPaperEntityFrameworkCoreTestModule>
{

}
