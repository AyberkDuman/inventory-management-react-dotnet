const requestEmployeesType = 'REQUEST_EMPLOYEES';
const receiveEmployeesType = 'RECEIVE_EMPLOYEES';
const requestEmployeeType = 'REQUEST_EMPLOYEE';
const receiveEmployeeType = 'RECEIVE_EMPLOYEE';
const addEmployeeType = 'ADD_EMPLOYEE';
const updateEmployeeType = 'UPDATE_EMPLOYEE';
const deleteEmployeeType = 'DELETE_EMPLOYEE';
const requestLoginType = 'REQUEST_LOGIN';
const receiveLoginType = 'RECEIVE_LOGIN';
const initialState = { employees: [], employee: {}, isLoading: false, signedin: false };

let allEmployee = [];
let currentEmployee = {};


export const actionCreators = {

    requestEmployees: () => async (dispatch, getState) => {
        dispatch({ type: requestEmployeesType });

        const url = `api/Employee`;
        const response = await fetch(url);
        const allEmployee = await response.json(url);
        dispatch({ type: receiveEmployeesType, allEmployee });
    },

    requestEmployee: (id) => async (dispatch, getState) => {
        dispatch({ type: requestEmployeeType });

        const url = `api/Employee/GetEmployee/${id}`;
        const response = await fetch(url);
        const employee = await response.json(url);
        dispatch({ type: receiveEmployeeType, employee });

    },

    addEmployee: (employee) => async (dispatch, getState) => {
        const baseURL = "./api/Employee";

        const data = JSON.stringify(
            { name: employee.name, power: employee.power, password: employee.password }
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
                dispatch({ type: addEmployeeType, employee: data });
            });
    },


    updateEmployee: (employee) => async (dispatch, getState) => {
        const baseURL = "/api/Employee";

        const data = JSON.stringify(
            { id: employee.id, name: employee.name, power: employee.power, password: employee.password }
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
                dispatch({ type: updateEmployeeType, employee: data });
            });
    },

    deleteEmployee: (employee) => async (dispatch, getState) => {
        const baseURL = "/api/Employee";

        const fetchTask = fetch(baseURL + "/" + employee.id, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
            .then((data) => {
                dispatch({ type: deleteEmployeeType });
            });
    },

    /*
    login: (id, password) => async (dispatch, getState) => {
        dispatch({ type: requestSigninType });

        const url = `api/Employee/GetEmployee/${id}`;
        const response = await fetch(url);
        const employee = await response.json();

        dispatch({ type: receiveSigninType, employee });

    }
    */
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestEmployeesType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveEmployeesType) {
        allEmployee = action.allEmployee;
        return {
            ...state,
            employees: allEmployee,
            isLoading: false
        };
    }

    if (action.type === requestEmployeeType) {
        return {
            ...state,
            isLoading: false
        };
    }

    if (action.type === receiveEmployeeType) {
        currentEmployee = action.employee;

        return {
            ...state,
            employee: currentEmployee,
            isLoading: false
        };
    }

    if (action.type === addEmployeeType) {
        
        return {
            ...state,
            isLoading: false
        };
    }

    if (action.type === updateEmployeeType) {

        return {
            ...state,
            isLoading: false
        };
    }

    if (action.type === deleteEmployeeType) {

        return {
            ...state,
            isLoading: false
        };
    }

    /*
    if (action.type === receiveSigninType) {
       //login
        
        return {
            ...state,
            signedin: true,
            isLoading: false
        };
    }
    */

    return state;
};