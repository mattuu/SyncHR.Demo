-- Warning: You can generate script only for one table at a time in your Free plan 
-- 
-- ****************** SqlDBM: Microsoft SQL Server ******************
-- ******************************************************************

USE SyncHRDemo
GO

CREATE TABLE [dbo].[Client]
(
 [ClientId] int NOT NULL IDENTITY(1, 1),
 [Name]     varchar(512) NOT NULL ,
 [TaxCode]  varchar(128) NOT NULL ,
 [Address]  varchar(1024) NOT NULL ,
 [Country]  varchar(256) NOT NULL ,


 CONSTRAINT [PK_Client] PRIMARY KEY CLUSTERED ([ClientId] ASC)
);
GO


CREATE TABLE [dbo].[PaymentType]
(
 [PaymentTypeId] int NOT NULL IDENTITY(1, 1) ,
 [Name]          varchar(128) NOT NULL ,


 CONSTRAINT [PK_PaymentType] PRIMARY KEY CLUSTERED ([PaymentTypeId] ASC)
);
GO


CREATE TABLE [dbo].[Invoice]
(
 [InvoiceId]     int NOT NULL IDENTITY(1, 1),
 [Year]          int NOT NULL ,
 [Month]         int NOT NULL ,
 [Number]        int NOT NULL ,
 [SellDate]      datetime NOT NULL ,
 [IssueDate]     datetime NOT NULL ,
 [PayTime]       int NOT NULL ,
 [IsPaid]        bit NOT NULL ,
 [GrossAmount]   money NOT NULL ,
 [NetAmount]     money NOT NULL ,
 [ClientId]      int NOT NULL ,
 [PaymentTypeId] int NOT NULL ,


 CONSTRAINT [PK_Invoice] PRIMARY KEY CLUSTERED ([InvoiceId] ASC),
 CONSTRAINT [FK_Invoice_PaymentType] FOREIGN KEY ([PaymentTypeId])  REFERENCES [dbo].[PaymentType]([PaymentTypeId]),
 CONSTRAINT [FK_Invoice_Client] FOREIGN KEY ([ClientId])  REFERENCES [dbo].[Client]([ClientId])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_Invoice_Client] ON [dbo].[Invoice] 
 (
  [ClientId] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_Invoice_PaymentType] ON [dbo].[Invoice] 
 (
  [PaymentTypeId] ASC
 )

GO



-- ****************** SqlDBM: Microsoft SQL Server ******************
-- ******************************************************************

-- ************************************** [dbo].[InvoiceRow]

CREATE TABLE [dbo].[InvoiceRow]
(
 [InvoiceRowId] int NOT NULL IDENTITY(1, 1) ,
 [ProductName]  varchar(500) NOT NULL ,
 [Quantity]     decimal(6,2) NOT NULL ,
 [Unit]         varchar(50) NOT NULL ,
 [UnitPrice]    money NOT NULL ,
 [InvoiceId]    int NOT NULL ,


 CONSTRAINT [PK_InvoiceRow] PRIMARY KEY CLUSTERED ([InvoiceRowId] ASC),
 CONSTRAINT [FK_InvoiceRow_Invoice] FOREIGN KEY ([InvoiceId])  REFERENCES [dbo].[Invoice]([InvoiceId]) ON DELETE CASCADE
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_InvoiceRow_Invoice] ON [dbo].[InvoiceRow] 
 (
  [InvoiceId] ASC
 )

GO