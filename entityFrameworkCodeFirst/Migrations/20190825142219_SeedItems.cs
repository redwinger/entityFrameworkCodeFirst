using Microsoft.EntityFrameworkCore.Migrations;

namespace EntityFrameworkCodeFirst.Migrations
{
    public partial class SeedItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.Sql("INSERT INTO TripItems (Name, TripId, Cost) VALUES('A-1', 1011, 300)");
            migrationBuilder.Sql("INSERT INTO TripItems (Name, TripId, Cost) VALUES('A-2', 1011, 300)");
            migrationBuilder.Sql("INSERT INTO TripItems (Name, TripId, Cost) VALUES('A-3', 1011, 300)");

            migrationBuilder.Sql("INSERT INTO TripItems (Name, TripId, Cost) VALUES('B-1', 1012, 200)");
            migrationBuilder.Sql("INSERT INTO TripItems (Name, TripId, Cost) VALUES('B-2', 1012, 200)");
            migrationBuilder.Sql("INSERT INTO TripItems (Name, TripId, Cost) VALUES('B-3', 1012, 200)");

            migrationBuilder.Sql("INSERT INTO TripItems (Name, TripId, Cost) VALUES('C-1', 1013, 100)");
            migrationBuilder.Sql("INSERT INTO TripItems (Name, TripId, Cost) VALUES('C-2', 1013, 100)");
            migrationBuilder.Sql("INSERT INTO TripItems (Name, TripId, Cost) VALUES('C-3', 1013, 100)");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
