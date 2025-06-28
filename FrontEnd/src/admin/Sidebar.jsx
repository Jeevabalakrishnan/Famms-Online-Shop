import React from 'react'
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="bg-dark  text-white vh-100 p-3" style={{ width: "250px",position:'sticky' }}>
    <Nav defaultActiveKey="#dashboard" className="flex-column">
      <Nav.Link href="#dashboard" as={Link} to='/dashboard' className="text-white">    <h4 className="text-white">Dashboard</h4></Nav.Link>
      <Nav.Link href="#categories" as={Link} to='/categories' className="text-white">Categories</Nav.Link>
      <Nav.Link href="#products" as={Link} to='/productsadmin' className="text-white">Products</Nav.Link>
      <Nav.Link href="#users" as={Link} to='/users' className="text-white">Users</Nav.Link>
      <Nav.Link href="#ordersadmin" as={Link} to='/ordersadmin' className="text-white">Orders</Nav.Link>
      <Nav.Link href="#settingspage" as={Link} to='/settingspage' className="text-white">Settings</Nav.Link>
    </Nav>
  </div>
  )
}

export default Sidebar;