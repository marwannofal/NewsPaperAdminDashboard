using NewsPaper.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace NewsPaper.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class NewsPaperController : AbpControllerBase
{
    protected NewsPaperController()
    {
        LocalizationResource = typeof(NewsPaperResource);
    }
}
