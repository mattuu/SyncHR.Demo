# SyncHR.Demo

## Pre-requisites

* Microsoft SQL Server Express (or higher)
* dotnet core 3.1 [SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1)
* node.js
* npm

## Installation

### Database

Following scripts need to be executed in exact order:

```
\db\CREATE.sql
\db\data\1.PaymentType.sql
\db\data\2.Client.sql
\db\data\3.Invoice.sql
\db\data\4.InvoiceRow.sql
```

### API

Connection string named `SyncHRDemo` in `\src\SyncHR.Demo.Api\appsettings.Development.json` needs changing to point to local instance of SQL Server:

``` 
"ConnectionStrings": {
   "SyncHRDemo": "<server_name>;Database=SyncHRDemo;Trusted_Connection=True;"
}
```

To start API:

```
cd \src\SyncHR.Demo.Api
dotnet run
```

> API runs on default port: [http://localhost:5000](http://localhost:5000)
> Swagger endpoint is enabled: [https://localhost:5001/swagger/index.html](https://localhost:5001/swagger/index.html)

### Web App

Run following command:

```
cd \src\SyncHR.Demo.Web
ng serve --open
```

> Application runs on default Angular development server: [http://localhost:4200/](http://localhost:4200/)