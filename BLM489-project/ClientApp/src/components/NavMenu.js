import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-10">
        <a class="navbar-brand" href="#">
            <img src="fordLogo.png" width="30" height="30" class="d-inline-block align-top" alt=""></img>
            FORD
        </a>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">

                <li class="nav-item">
                    <LinkContainer to={'/'} exact>
                        <NavItem>
                            Login
                        </NavItem>
                    </LinkContainer>
                </li>

                <li class="nav-item">
                    <LinkContainer to={'/Inventory'} >
                        <NavItem>
                            Inventory
                        </NavItem>
                    </LinkContainer>
                </li>

                <li class="nav-item">
                    <LinkContainer to={'/Employee'} >
                        <NavItem>
                            Employee
                        </NavItem>
                    </LinkContainer>
                </li>

                <li class="nav-item">
                    <LinkContainer to={'/Error'} >
                        <NavItem>
                            Error Reporting
                        </NavItem>
                    </LinkContainer>
                </li>
            </ul>
        </div>
    </nav>

);
