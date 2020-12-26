import React from 'react';
import { connect } from 'react-redux';

const Home = props => (
    <div className="col-md-8">
        <div className="card justify-content-center">
            <div className="card-header">
                <h1>Inventory Management System</h1>
                <p>Welcome to system, authentication required  </p>
            </div>

            <div className="card-body ">
                <form>
                    <div className="form-group">
                        <label htmlFor="id">Employee Number</label>
                        <input type="text" name="id" id="id" placeholder="Enter Employee Number" class="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password" placeholder="Enter Password" class="form-control" />
                    </div>

                    <button class="btn btn-primary btn-block " type="submit">LogIn</button>
                </form>
            </div>

        </div>
    

  </div>




);

export default connect()(Home);
