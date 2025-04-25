import React from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Users = () => {
  return (
    <Container fluid className="py-4 bg-light min-vh-100">
    <div> <h1 className="mb-4 header-name">Users</h1> <Link to='/' className='defalut'>Home<MdOutlineKeyboardArrowRight /></Link></div>
    </Container>
  )
}

export default Users;