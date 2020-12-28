import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/EmployeeStore';
import { render } from 'react-dom';
import { connect } from 'react-redux';

class Employee extends Component {

    state = {
        name: "",
        power: "",
        phone: "",
        editing: ""
    };

    componentWillMount() {
        this.props.requestEmployees();
    }

    addEmployee() {
        const employee = {  name: this.state.name, power: this.state.power, phone: this.state.phone };
        this.props.addEmployee(employee);
        setTimeout(this.props.requestEmployees, 600);
    }

    toggleEditing(itemId) {
        this.setState({ editing: itemId });
    }

    handleEmployeeUpdate(employee) {
        this.props.updateEmployee(employee);
        setTimeout(this.props.requestEmployees, 600);
    }

    handleEmployeeDelete(employee) {
        this.props.deleteEmployee(employee);
        setTimeout(this.props.requestEmployees, 500);
    }

    handleEditField(event) {
        if (event.keyCode === 13) {
            let target = event.target,
                update = {};

            update.name = this.state.editing;
            update[target.name] = target.value;
        }
    }

    handleEditItem() {
        let itemId = this.state.editing;

        var editEmployee = this.props.employees.find((v) => v.name === itemId);

        editEmployee.power = this.refs[`power_${itemId}`].value;
        editEmployee.phone = this.refs[`phone_${itemId}`].value;

        this.handleEmployeeUpdate(editEmployee);
        this.setState({ editing: "" });
    }

    handleDeleteItem() {
        let itemId = this.state.editing;

        var deleteEmployee = this.props.employees.find((v) => v.name === itemId);

        this.handleEmployeeDelete(deleteEmployee);
        this.setState({ editing: "" });
    }

    renderItemOrEditField(employee) {
        if (this.state.editing === employee.name) {
            return (
                <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    
                    <td>
                        <input
                            onKeyDown={this.handleEditField}
                            type="text"
                            ref={`power_${employee.name}`}
                            name="power"
                            defaultValue={employee.power}
                        />
                        
                    </td>
                    <td>
                        <input 
                            onKeyDown={this.handleEditField}
                            type="text"
                            ref={`phone_${employee.name}`}
                            name="phone"
                            defaultValue={employee.phone}
                        />
                    </td>
                    <td>
                        <button class="btn btn-primary " onClick={this.handleEditItem.bind(this)} label="Update Employee" >Update</button>
                    </td>
                    <td>
                        <button class="btn btn-primary " onClick={this.handleDeleteItem.bind(this)} label="Delete Employee" >Delete</button>
                    </td>
                </tr>);
        } else {
            return (
                <tr key={employee.id}
                    onClick={this.toggleEditing.bind(this, employee.name)}
                >
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.power}</td>
                    <td>{employee.phone}</td>
                    <td></td>
                    <td></td>
                </tr>);
        }
    }

    renderEmployeesTable(props) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Employee Number</th>
                        <th>Name</th>
                        <th>Power</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.employees.map(employee =>
                        this.renderItemOrEditField(employee)
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="col-lg-16" >
                <div className="card justify-content-center">
                    <div className="card-header">
                        <h1>All Employees</h1>
                        {this.renderEmployeesTable(this.props)}
                    </div>

                    <div className="card-body ">
                        <form>
                           
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="employeeName" placeholder="Enter Name" class="form-control" value={this.state.name} onChange={(ev) => this.setState({ name: ev.target.value })} />
                            </div>

                            <div className="btn-group btn-group-toggle" data-toggle="buttons" onChange={(ev) => this.setState({ power: ev.target.value })}>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" value="Admin" /> Admin
                                </label>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" value="Seller" /> Seller
                                </label>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" value="Buyer" /> Buyer
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="number" id="employeePhone" placeholder="Enter Phone" class="form-control" value={this.state.phone} onChange={(ev) => this.setState({ phone: ev.target.value })} />
                            </div>

                            <button class="btn btn-primary btn-block " type="button" onClick={this.addEmployee.bind(this)}>Add New Employee</button>
                        </form>
                    </div>

                </div>


            </div >
        );
    }

}

export default connect(
    state => state.employees,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Employee);