using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EntityFrameworkCodeFirst.DtoModels.TripManagement
{
    public class TripDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TotalActivities { get; set; }
        public int TotalCost { get; set; }

    }
}
