using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLM489_project.Models
{
    public class Inventory
{
        public long Id { get; set; }
        public string Chassis { get; set; }
        public string Model { get; set; }
        public string Year { get; set; }
        public string Fuel { get; set; }
        public string Price { get; set; }
    }
}
