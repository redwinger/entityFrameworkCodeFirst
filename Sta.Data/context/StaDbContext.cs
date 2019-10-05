using Microsoft.EntityFrameworkCore;
using Sta.Domain.TripManagement;

namespace Sta.Data.context
{
    public class StaDbContext : DbContext
    {
        public StaDbContext(DbContextOptions<StaDbContext> options) : base(options) { }

        public DbSet<Trip> Trips { get; set; }
        public DbSet<TripItem> TripItems { get; set; }

    }
}
