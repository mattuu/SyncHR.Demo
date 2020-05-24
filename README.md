# SyncHR.Demo

## Pre-requisites

* Microsoft SQL Server Express (or higher)
* dotnet core 3.1 [SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1)
* node.js
* npm

## Installation

### Database

```
\db\CREATE.sql
\db\data\1.PaymentType.sql
\db\data\2.Client.sql
\db\data\3.Invoice.sql
\db\data\4.InvoiceRow.sql
```
> Scripts need to be executed in exact order as above.

### API

```
cd \src\SyncHR.Demo.Api
dotnet run
```

> Swagger endpoint: [https://localhost:5001/swagger/index.html](https://localhost:5001/swagger/index.html)

### Web App

```
cd \src\SyncHR.Demo.Web
ng serve --open
```

> Applicaton runs at default Angular development port: [http://localhost:4200/](http://localhost:4200/)