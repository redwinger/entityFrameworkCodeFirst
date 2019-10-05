using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sta.Domain.TripManagement
{
    public class TripItem
    {
        public int Id { get; set; }
        [Required]
        [StringLength(75)]
        public string Name { get; set; }
        public string Notes { get; set; }
        public string Address { get; set; }
        public int Cost { get; set; }
        public int? LocalCost { get; set; }

        public int TripId { get; set; }
        public Trip Trip { get; set; }
    }
}
