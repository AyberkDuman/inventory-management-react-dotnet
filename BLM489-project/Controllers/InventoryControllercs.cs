using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BLM489_project.Models;

namespace BLM489_project.Controllers
{
    [Route("api/[controller]")]

    public class InventoryController : Controller
    {
        private readonly InventoriesContenx _context;

        public InventoryController(InventoriesContenx context)
        {
            _context = context;

            if (_context.Inventories.Count() == 0)
            {
                _context.Inventories.Add(new Inventory() { Chassis = "LP244S22RDEA", Model = "Mustang", Year = "2020", Fuel = "Gas", Price = "3.000.000" });
                _context.Inventories.Add(new Inventory() { Chassis = "4P97JFF9S99T", Model = "Fiesta", Year = "2019", Fuel = "Gas", Price = "203.400" });
                _context.Inventories.Add(new Inventory() { Chassis = "J74002R39XC1", Model = "Focus", Year = "2020", Fuel = "Diesel", Price = "300.700" });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public List<Inventory> GetInventories()
        {
            return _context.Inventories.ToList();
        }

        [HttpGet("[action]/{id}")]
        public Inventory GetInventories(long id)
        {
            var inventory = _context.Inventories.Find(id);

            if (inventory == null)
            {
                return null;
            }
            else
            {
                return inventory;
            }
        }

        [HttpPost]
        public IActionResult AddInventory([FromBody] Inventory item)
        {
            _context.Inventories.Add(item);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpPut]
        public IActionResult Update([FromBody] Inventory inventory)
        {
            var inventoryToUpdate = _context.Inventories.Find(inventory.Id);

            if (inventoryToUpdate == null)
            {
                return NotFound();
            }

            inventoryToUpdate.Chassis = inventory.Chassis;
            inventoryToUpdate.Model = inventory.Model;
            inventoryToUpdate.Year = inventory.Year;
            inventoryToUpdate.Fuel = inventory.Fuel;
            inventoryToUpdate.Price = inventory.Price;

            _context.Inventories.Update(inventoryToUpdate);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var inventoryToDelete = _context.Inventories.Find(id);

            if (inventoryToDelete == null)
            {
                return NotFound();
            }

            _context.Inventories.Remove(inventoryToDelete);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

    }
}