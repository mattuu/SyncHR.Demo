using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SyncHR.Demo.DataAccess.Models;

namespace SyncHR.Demo.DataAccess
{
    public partial class SyncHRDemoContext : DbContext
    {
        public SyncHRDemoContext()
        {
        }

        public SyncHRDemoContext(DbContextOptions<SyncHRDemoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<InvoiceRow> InvoiceRows { get; set; }
        public virtual DbSet<PaymentType> PaymentTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>(entity =>
            {
                entity.ToTable("Client");

                entity.HasKey(e => e.ClientId);

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(1024)
                    .IsUnicode(false);

                entity.Property(e => e.Country)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.TaxCode)
                    .IsRequired()
                    .HasMaxLength(128)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.ToTable("Invoice");
              
                entity.HasKey(e => e.InvoiceId);

                entity.HasIndex(e => e.ClientId)
                    .HasName("fkIdx_Invoice_Client");

                entity.HasIndex(e => e.PaymentTypeId)
                    .HasName("fkIdx_Invoice_PaymentType");

                entity.Property(e => e.GrossAmount).HasColumnType("money");

                entity.Property(e => e.IssueDate).HasColumnType("datetime");

                entity.Property(e => e.NetAmount).HasColumnType("money");

                entity.Property(e => e.SellDate).HasColumnType("datetime");

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.Invoice)
                    .HasForeignKey(d => d.ClientId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Invoice_Client");

                entity.HasOne(d => d.PaymentType)
                    .WithMany(p => p.Invoice)
                    .HasForeignKey(d => d.PaymentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_51");
            });

            modelBuilder.Entity<InvoiceRow>(entity =>
            {
                entity.ToTable("InvoiceRow");
                
                entity.HasKey(e => e.InvoiceRowId);

                entity.HasIndex(e => e.InvoiceId)
                    .HasName("fkIdx_InvoiceRow_Invoice");

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Quantity).HasColumnType("decimal(6, 2)");

                entity.Property(e => e.Unit)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UnitPrice).HasColumnType("money");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.Rows)
                    .HasForeignKey(d => d.InvoiceId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_InvoiceRow_Invoice");
            });

            modelBuilder.Entity<PaymentType>(entity =>
            {
                entity.ToTable("PaymentType");
                
                entity.HasKey(e => e.PaymentTypeId);
                
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(128)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
