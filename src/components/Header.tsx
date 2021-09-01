import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <Navbar className = "mb-5" bg="light" expand="lg">
        <Navbar.Brand>Invoice App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <div className="col-sm-auto">
            <NavLink to="/invoices">Invoices</NavLink>
          </div>
          <div className="col-sm-auto">
            <NavLink to="/products">Products</NavLink>
          </div>
          <div className="col-sm-auto">
            <NavLink to="/customers">Customers</NavLink>
          </div>
        </Nav>
        </Navbar.Collapse>
  </Navbar>
  );
}

export default Header;