using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLM489_project.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private static List<Employee> Employees = new List<Employee>()
        {
            new Employee() {Id= "1", Name= "J.R.R.Tolkien", Power= "Admin", Phone= "101543"},
            new Employee() {Id= "2", Name= "Mark Twain", Power= "Buyer", Phone= "202432"},
            new Employee() {Id= "3", Name= "Ursula LeGuin", Power= "Seller", Phone= "303987"}

        };
        
        [HttpGet("[action]")]
        public List<Employee> GetEmployees ()
        {
            return Employees;
        }

        [HttpGet("[action]/{id}")]
        public Employee GetEmployee(string id)
        {
            var employee = Employees.Find((v) => v.Id.ToLower() == id.ToLower());

            if (employee == null)
            {
                return null;
            }
            else
            {
                return employee;
            }    
        }

        [HttpPost]
        public IActionResult AddEmployee([FromBody] Employee item)
        {
            Employees.Add(item);                       

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpPut]
        public IActionResult Update ([FromBody] Employee employee)
        {
            var employeeToUpdate = Employees.Find((v) => v.Id == employee.Id);

            if(employeeToUpdate == null)
            {
                return NotFound();
            }

            employeeToUpdate.Name = employee.Name;
            employeeToUpdate.Power = employee.Power;
            employeeToUpdate.Phone = employee.Phone;

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var employeeToDelete = Employees.Find((v) => v.Id == id);

            if (employeeToDelete == null)
            {
                return NotFound();
            }

            Employees.Remove(employeeToDelete);

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }


        public class Employee
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Power { get; set; }
            public string Phone { get; set; }
        }   
    }
}
