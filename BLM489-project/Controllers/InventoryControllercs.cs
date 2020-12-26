using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace BLM489_project.Controllers
{
    [Route("api/[controller]")]

    public class InventoryController : Controller
    {
        private static List<Inventory> Inventories = new List<Inventory>()
            {
                new Inventory() {Id= "000123", Model= "Mustang", Year= "2020", Fuel= "Gas", Price= "3.000.000"},
                new Inventory() {Id= "000234", Model= "Fiesta", Year= "2019", Fuel= "Gas", Price= "203.400"},
                new Inventory() {Id= "000456", Model= "Focus", Year= "2020", Fuel= "Diesel", Price= "300.700"}

            };

        [HttpGet("[action]")]
        public List<Inventory> GetInventories()
        {
            return Inventories;
        }

        [HttpGet("[action]/{id}")]
        public Inventory GetInventories(string id)
        {
            var inventory = Inventories.Find((v) => v.Id.ToLower() == id.ToLower());

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
            Inventories.Add(item);

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpPut]
        public IActionResult Update([FromBody] Inventory inventory)
        {
            var inventoryToUpdate = Inventories.Find((v) => v.Id == inventory.Id);

            if (inventoryToUpdate == null)
            {
                return NotFound();
            }

            inventoryToUpdate.Model = inventory.Model;
            inventoryToUpdate.Year = inventory.Year;
            inventoryToUpdate.Fuel = inventory.Fuel;
            inventoryToUpdate.Price = inventory.Price;

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var inventoryToDelete = Inventories.Find((v) => v.Id == id);

            if (inventoryToDelete == null)
            {
                return NotFound();
            }

            Inventories.Remove(inventoryToDelete);

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        public class Inventory
        {
            public string Id { get; set; }
            public string Model { get; set; }
            public string Year { get; set; }
            public string Fuel { get; set; }
            public string Price { get; set; }
        }



    }
}