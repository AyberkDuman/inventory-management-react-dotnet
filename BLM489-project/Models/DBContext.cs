using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BLM489_project.Models
{
    public class EmployeesContext : DbContext
    {
        public EmployeesContext (DbContextOptions <EmployeesContext> options)
            : base(options)
        {        
        }

        public DbSet<Employee> Employees { get; set; }
    }

    public class InventoriesContenx : DbContext
    {
        public InventoriesContenx (DbContextOptions <InventoriesContenx> options)
            : base(options)
        {
        }

        public DbSet<Inventory> Inventories { get; set; }
    }
}
