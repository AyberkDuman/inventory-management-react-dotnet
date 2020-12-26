import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store/InventoryStore';

class Inventory extends Component {

    state = {
        id: "",
        model: "",
        year: "",
        fuel: "",
        price: "",
        editing: ""
    };

    componentWillMount() {
        this.props.requestInventories();
    }

    addInventory() {
        const inventory = { id: this.state.id, model: this.state.model, year: this.state.year, fuel: this.state.fuel, price: this.state.price};
        this.props.addInventory(inventory);
        setTimeout(this.props.requestInventories, 600);
    }

    toggleEditing(itemId) {
        this.setState({ editing: itemId });
    }

    handleInventoryUpdate(inventory) {
        this.props.updateInventory(inventory);
        setTimeout(this.props.requestInventories, 600);
    }

    handleInventoryDelete(inventory) {
        this.props.deleteInventory(inventory);
        setTimeout(this.props.requestInventories, 500);
    }

    handleEditField(event) {
        if (event.keyCode === 13) {
            let target = event.target,
                update = {};

            update.id = this.state.editing;
            update[target.id] = target.value;
        }
    }

    handleEditItem() {
        let itemId = this.state.editing;

        var editInventory = this.props.inventories.find((v) => v.id === itemId);

        editInventory.model = this.refs[`model_${itemId}`].value;
        editInventory.year = this.refs[`year_${itemId}`].value;
        editInventory.fuel = this.refs[`fuel_${itemId}`].value;
        editInventory.price = this.refs[`price_${itemId}`].value;

        this.handleInventoryUpdate(editInventory);
        this.setState({ editing: "" });
    }

    handleDeleteItem() {
        let itemId = this.state.editing;

        var deleteInventory = this.props.inventories.find((v) => v.id === itemId);

        this.handleInventoryDelete(deleteInventory);
        this.setState({ editing: "" });
    }

    renderItemOrEditField(inventory) {
        if (this.state.editing === inventory.id) {
            return (
                <tr key={inventory.id}>
                    <td>{inventory.id}</td>
                    <td>
                        <input
                            onKeyDown={this.handleEditField}
                            type="text"
                            ref={`model_${inventory.id}`}
                            name="model"
                            defaultValue={inventory.model}
                        />
                    </td>
                    <td>
                        <input
                            onKeyDown={this.handleEditField}
                            type="text"
                            ref={`year_${inventory.id}`}
                            name="year"
                            defaultValue={inventory.year}
                        />

                    </td>
                    <td>
                        <input
                            onKeyDown={this.handleEditField}
                            type="text"
                            ref={`fuel_${inventory.id}`}
                            name="fuel"
                            defaultValue={inventory.fuel}
                        />
                    </td>
                    <td>
                        <input
                            onKeyDown={this.handleEditField}
                            type="text"
                            ref={`price_${inventory.id}`}
                            name="price"
                            defaultValue={inventory.price}
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
                <tr key={inventory.id}
                    onClick={this.toggleEditing.bind(this, inventory.id)}
                >
                    <td>{inventory.id}</td>
                    <td>{inventory.model}</td>
                    <td>{inventory.year}</td>
                    <td>{inventory.fuel}</td>
                    <td>{inventory.price}</td>
                    <td></td>
                    <td></td>
                </tr>);
        }
    }

    renderInventoriesTable(props) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Item id</th>
                        <th>Model</th>
                        <th>Model Year</th>
                        <th>Fuel Type</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.inventories.map(inventory =>
                        this.renderItemOrEditField(inventory)
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
                        <h1>Inventory</h1>
                        {this.renderInventoriesTable(this.props)}
                    </div>

                    <div className="card-body ">
                        <form>
                            <div className="form-group">
                                <label htmlFor="id">ID</label>
                                <input type="number" id="inventoryId" placeholder="Enter Item Id" class="form-control" value={this.state.id} onChange={(ev) => this.setState({ id: ev.target.value })} />
                            </div>

                            <div className="btn-group btn-group-toggle" data-toggle="buttons" onChange={(ev) => this.setState({ model: ev.target.value })}>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" value="Fiesta" /> Fiesta
                                </label>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" value="Focus" /> Focus
                                </label>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" value="Puma" /> Puma
                                </label>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" value="Ranger" /> Ranger
                                </label>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" value="Mustang" /> Mustang
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="year">Model Year</label>
                                <input type="number" id="inventoryYear" placeholder="Enter Model Year" class="form-control" value={this.state.year} onChange={(ev) => this.setState({ year: ev.target.value })} />
                            </div>

                            <div className="btn-group btn-group-toggle" data-toggle="buttons" onChange={(ev) => this.setState({ fuel: ev.target.value })}>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" value="Gas" /> Gas
                                </label>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" value="Diesel" /> Diesel
                                </label>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" value="Electric" /> Electric
                                </label>
                            </div>


                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input type="number" id="inventoryPrice" placeholder="Enter Price" class="form-control" value={this.state.price} onChange={(ev) => this.setState({ price: ev.target.value })} />
                            </div>

                            <button class="btn btn-primary btn-block " type="button" onClick={this.addInventory.bind(this)}>Add New Item</button>
                        </form>
                    </div>

                </div>


            </div >
        );
    }

}


export default connect(
    state => state.inventories,
    dispatch => bindActionCreators(actionCreators, dispatch))
   (Inventory);