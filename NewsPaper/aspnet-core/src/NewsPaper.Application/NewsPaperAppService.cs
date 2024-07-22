using System;
using System.Collections.Generic;
using System.Text;
using NewsPaper.Localization;
using Volo.Abp.Application.Services;

namespace NewsPaper;

/* Inherit your application services from this class.
 */
public abstract class NewsPaperAppService : ApplicationService
{
    protected NewsPaperAppService()
    {
        LocalizationResource = typeof(NewsPaperResource);
    }
}
