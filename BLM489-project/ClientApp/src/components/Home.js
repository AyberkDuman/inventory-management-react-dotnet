import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/EmployeeStore';


class Home extends Component {

    state = {
        name: "",
        password: ""
    };

    handleEditField(event) {
        let login = {};
        login.name = this.state.name;
        login.password = this.state.password;
    }

    handleLogin() {
        var name = this.refs[`employeeName`].value;
        var password = this.refs[`employeePassword`].value;
        this.props.login(name, password);
    }

    render() {
        return (
            <div className="col-md-8">
                <div className="card justify-content-center">
                    <div className="card-header">
                        <h1>Inventory Management System</h1>
                        <p>Welcome to system, authentication required  </p>
                    </div>

                    <div className="card-body ">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Employee Name</label>
                                <input
                                    onKeyDown={this.handleEditField.bind(this)}
                                    type="text"
                                    ref={`employeeName`}
                                    name="name"
                                    placeholder="Enter Employee Name" class="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    onKeyDown={this.handleEditField.bind(this)}
                                    type="password"
                                    ref={`employeePassword`}
                                    name="password"
                                    placeholder="Enter Password" class="form-control"
                                />
                            </div>

                            <button class="btn btn-primary btn-block " type="button" onClick={this.handleLogin.bind(this)} >LogIn</button>

                        </form>
                    </div>

                </div>
            </div>            
            );
    }




}

export default connect(
    state => state.employees,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
