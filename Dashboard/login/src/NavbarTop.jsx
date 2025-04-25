import React from 'react'
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { TbLogout } from "react-icons/tb";
import { NavDropdown } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";

const NavbarTop = () => {
  return (
    <div >
   <Nav defaultActiveKey="#dashboard">
      <Nav.Link href="#dashboard" as={Link} to='/' className="text-dark"><h4>Fammscart</h4></Nav.Link>
     <NavDropdown className="text-dark ms-auto" title={<span style={{color:'black'}}>Admin</span>}>
      <NavDropdown.Item><CgProfile className='mb-1'/> Your Profile</NavDropdown.Item>
     </NavDropdown>
      <Nav.Link  className="text-dark"> <TbLogout /> Logout</Nav.Link>
   
    </Nav>
    </div>
  )
}

export default NavbarTop;