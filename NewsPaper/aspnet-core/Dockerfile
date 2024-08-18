FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY common.props ../../common.props 
COPY src/ .
RUN dotnet restore "NewsPaper.HttpApi.Host/NewsPaper.HttpApi.Host.csproj"
WORKDIR "/src/NewsPaper.HttpApi.Host"
RUN dotnet build "NewsPaper.HttpApi.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NewsPaper.HttpApi.Host.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NewsPaper.HttpApi.Host.dll"]
