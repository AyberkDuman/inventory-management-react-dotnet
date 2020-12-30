import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Error extends Component {

    
    render() {
        return (
            <div className="container pb-cmnt-container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card card-info">
                            <div className="card-block">
                                <textarea className="pb-cmnt-textarea" rows="10" column="10"></textarea>
                                <form className="form-inline">
                                    <button className="btn btn-primary float-xs-right" type="button" id="report">Error Reporting</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            );
    }
}

export default connect()(Error);
