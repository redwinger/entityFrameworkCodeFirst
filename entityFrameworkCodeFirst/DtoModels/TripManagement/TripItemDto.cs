using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EntityFrameworkCodeFirst.DtoModels.TripManagement
{
    public class TripItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public string Address { get; set; }
        public int Cost { get; set; }
        public int? LocalCost { get; set; }

        public int TripId { get; set; }
        public TripDto Trip { get; set; }
    }
}
