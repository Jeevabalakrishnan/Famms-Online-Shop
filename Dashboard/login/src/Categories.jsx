// import React from 'react'
// import { Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// const Categories = () => {
//   return (
//       <Container fluid className="py-4 bg-light min-vh-100">
//         <div> <h1 className="mb-4 header-name">Categories</h1> <Link to='/' className='defalut'>Home<MdOutlineKeyboardArrowRight /></Link></div>
//         </Container>
//   )
// }

// export default Categories;

import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  // Dummy load - Replace with actual API call
  useEffect(() => {
    fetch('/api/categories') // You will need to set up this API
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddCategory = () => {
    fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryName }),
    })
      .then(res => res.json())
      .then(data => {
        setCategories([...categories, data]);
        setCategoryName('');
        setShow(false);
      });
  };

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <h1 className="mb-4 header-name">Categories</h1>
      <Link to="/" className="defalut">
        Home <MdOutlineKeyboardArrowRight />
      </Link>

      <Button className="my-3" onClick={() => setShow(true)}>Add Category</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat._id}>
              <td>{index + 1}</td>
              <td>{cat.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button onClick={handleAddCategory}>Add</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Categories;
