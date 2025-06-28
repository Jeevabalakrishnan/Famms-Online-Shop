import React from 'react';
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';
import { TbLogout } from "react-icons/tb";
import { NavDropdown } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";

const NavbarTop = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-3">
      <Container fluid>
        {/* Brand Name */}
        <Navbar.Brand as={Link} to='/dashboard' className="text-dark fs-4 fw-bold">
          Fammscart
        </Navbar.Brand>

        {/* Right Side Navigation */}
        <Nav className="ms-auto d-flex align-items-center">
          {/* Admin Dropdown */}
          <NavDropdown title={<span style={{color:'black'}}>Admin</span>} className="me-3">
            <NavDropdown.Item><CgProfile className='me-2'/> Your Profile</NavDropdown.Item>
          </NavDropdown>

          {/* Logout Button */}
          <Nav.Link as={Link} to='/admin' className="text-dark d-flex align-items-center">
            <TbLogout className="me-2" /> Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;