// import React from 'react'
// import { Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";

// const Products = () => {
//   return (
//     <Container fluid className="py-4 bg-light min-vh-100">
//     <div> <h1 className="mb-4 header-name">Products</h1> <Link to='/' className='defalut'>Home<MdOutlineKeyboardArrowRight /></Link></div>
//     </Container>
//   )
// }

// export default Products;

import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '' });

  useEffect(() => {
    fetch('/api/products') // Setup your backend endpoint
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddProduct = () => {
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(res => res.json())
      .then(data => {
        setProducts([...products, data]);
        setNewProduct({ name: '', price: '', category: '' });
        setShow(false);
      });
  };

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <h1 className="mb-4 header-name">Products</h1>
      <Link to="/" className="defalut">
        Home <MdOutlineKeyboardArrowRight />
      </Link>

      <Button className="my-3" onClick={() => setShow(true)}>Add Product</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index) => (
            <tr key={prod._id}>
              <td>{index + 1}</td>
              <td>{prod.name}</td>
              <td>₹{prod.price}</td>
              <td>{prod.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button onClick={handleAddProduct}>Add</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Products;
