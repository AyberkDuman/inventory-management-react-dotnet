const requestInventoriesType = 'REQUEST_INVENTORIES';
const receiveInventoriesType = 'RECEIVE_INVENTORIES';
const requestInventoryType = 'REQUEST_INVENTORY';
const receiveInventoryType = 'RECEIVE_INVENTORY';
const addInventoryType = 'ADD_INVENTORY';
const updateInventoryType = 'UPDATE_INVENTORY';
const deleteInventoryType = 'DELETE_INVENTORY';
const initialState = { inventories: [], inventory: {}, isLoading: false };

let allInventory = [];
let currentInventory = {};

export const actionCreators = {

    requestInventories: () => async (dispatch, getState) => {
        dispatch({ type: requestInventoriesType });

        const url = `api/Inventory/GetInventories`;
        const response = await fetch(url);
        const allInventory = await response.json(url);
        dispatch({ type: receiveInventoriesType, allInventory });
    },

    requestInventory: (id) => async (dispatch, getState) => {
        dispatch({ type: requestInventoryType });

        const url = `api/Inventory/GetInventories/${id}`;
        const response = await fetch(url);
        const inventory = await response.json(url);
        dispatch({ type: receiveInventoryType, inventory });

    },

    addInventory: (inventory) => async (dispatch, getState) => {
        const baseURL = "./api/Inventory";

        const data = JSON.stringify(
            { id: inventory.id, model: inventory.model, year: inventory.year, fuel: inventory.fuel, price: inventory.price }
        );

        const fetchTask = fetch(baseURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
            .then((data) => {
                dispatch({ type: addInventoryType, inventory: data });
            });
    },

    updateInventory: (inventory) => async (dispatch, getState) => {
        const baseURL = "/api/Inventory";

        const data = JSON.stringify(
            { id: inventory.id, model: inventory.model, year: inventory.year, fuel: inventory.fuel, price: inventory.price }
        );

        const fetchTask = fetch(baseURL, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
            .then((data) => {
                dispatch({ type: updateInventoryType, inventory: data });
            });
    },

    deleteInventory: (inventory) => async (dispatch, getState) => {
        const baseURL = "/api/Inventory";

        const fetchTask = fetch(baseURL + "/" + inventory.id, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
            .then((data) => {
                dispatch({ type: deleteInventoryType });
            });
    }

};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestInventoriesType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveInventoriesType) {
        allInventory = action.allInventory;
        return {
            ...state,
            inventories: allInventory,
            isLoading: false
        };
    }

    if (action.type === requestInventoryType) {
        return {
            ...state,
            isLoading: false
        };
    }

    if (action.type === receiveInventoryType) {
        currentInventory = action.inventory;
        return {
            ...state,
            inventory: currentInventory,
            isLoading: false
        };

    }

    if (action.type === addInventoryType) {
        
        return {
            ...state,
            isLoading: false
        };
    }

    if (action.type === updateInventoryType) {

        return {
            ...state,
            isLoading: false
        };
    }

    if (action.type === deleteInventoryType) {

        return {
            ...state,
            isLoading: false
        };
    }



    return state;
};
