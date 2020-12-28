using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLM489_project.Models;

namespace BLM489_project.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly EmployeesContext _context;

        public EmployeeController (EmployeesContext context)
        {
            _context = context;

            if(_context.Employees.Count() == 0)
            {
                _context.Employees.Add(new Employee() { Name = "J.R.R.Tolkien", Power = "Admin", Phone = "101543" });
                _context.Employees.Add(new Employee() { Name = "Mark Twain", Power = "Buyer", Phone = "202432" });
                _context.Employees.Add(new Employee() { Name = "Ursula LeGuin", Power = "Seller", Phone = "303987" });
                _context.SaveChanges();
            }
        }

        
        [HttpGet]
        public List<Employee> GetEmployees ()
        {
            return _context.Employees.ToList();
        }

        [HttpGet("[action]/{id}")]
        public Employee GetEmployee(long id)
        {
            var employee = _context.Employees.Find(id);

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
            _context.Employees.Add(item);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpPut]
        public IActionResult Update([FromBody] Employee employee)
        {
            var employeeToUpdate = _context.Employees.Find(employee.Id);

            if (employeeToUpdate == null)
            {
                return NotFound();
            }

            employeeToUpdate.Name = employee.Name;
            employeeToUpdate.Power = employee.Power;
            employeeToUpdate.Phone = employee.Phone;

            _context.Employees.Update(employeeToUpdate);
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
            var employeeToDelete = _context.Employees.Find(id);

            if (employeeToDelete == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employeeToDelete);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

    }
}
