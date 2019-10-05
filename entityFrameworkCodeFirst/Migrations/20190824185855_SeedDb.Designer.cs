﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Sta.Data.context;

namespace EntityFrameworkCodeFirst.Migrations
{
    [DbContext(typeof(StaDbContext))]
    [Migration("20190824185855_SeedDb")]
    partial class SeedDb
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Sta.Domain.TripManagement.Trip", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Cost");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(75);

                    b.Property<int>("TotalActivities");

                    b.HasKey("Id");

                    b.ToTable("Trips");
                });

            modelBuilder.Entity("Sta.Domain.TripManagement.TripItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<int>("Cost");

                    b.Property<int?>("LocalCost");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(75);

                    b.Property<string>("Notes");

                    b.Property<int>("TripId");

                    b.HasKey("Id");

                    b.HasIndex("TripId");

                    b.ToTable("TripItems");
                });

            modelBuilder.Entity("Sta.Domain.TripManagement.TripItem", b =>
                {
                    b.HasOne("Sta.Domain.TripManagement.Trip", "Trip")
                        .WithMany("Items")
                        .HasForeignKey("TripId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
