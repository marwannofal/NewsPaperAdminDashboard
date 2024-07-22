using Volo.Abp.Settings;

namespace NewsPaper.Settings;

public class NewsPaperSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(NewsPaperSettings.MySetting1));
    }
}
