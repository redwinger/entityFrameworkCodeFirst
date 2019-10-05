using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sta.Domain.TripManagement
{
    public class Trip
    {
        public int Id { get; set; }
        [Required]
        [StringLength(75)]
        public string Name { get; set; }
        public int TotalActivities { get; set; }
        public int TotalCost { get; set; }
        public List<TripItem> Items { get; set; }
    }
}
