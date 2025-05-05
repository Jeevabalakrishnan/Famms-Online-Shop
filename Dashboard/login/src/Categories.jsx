import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Categories = () => {
  const [categories, setCategories] = useState([
    { _id: 1, name: "Men's Dress", sortOrder: 1 },
    { _id: 2, name: "Women's Dress", sortOrder: 2 }
  ]);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleAddCategory = () => {
    const newCategory = {
      _id: categories.length + 1,
      name: categoryName,
      sortOrder: parseInt(sortOrder) || categories.length + 1
    };
    setCategories([...categories, newCategory]);
    setCategoryName('');
    setSortOrder('');
    setShow(false);
  };

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
     
        <h1 className="mb-4 header-name">Categories</h1>
  <Link to="/" className="defalut">
        Home <MdOutlineKeyboardArrowRight />
      </Link>
      <div className="d-flex justify-content-end align-items-center">
        <Button variant="primary" onClick={() => setShow(true)}>+ Add Category</Button>
      </div>
      <Table bordered hover className="mt-3">
        <thead>
          <tr>
            <td style={{ width: "1px" }} className="text-center">
              <Form.Check type="checkbox" />
            </td>
            <th className="text-left">Category Name</th>
            <th className="text-right">Sort Order</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td className="text-center">
                <Form.Check type="checkbox" />
              </td>
              <td className="text-left">{cat.name}</td>
              <td className="text-right">{cat.sortOrder}</td>
              <td className="text-right">
                <Button size="sm" variant="primary">
                  <i className="fa fa-pencil"></i> Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Category Modal */}
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
          <Form.Group>
            <Form.Label>Sort Order</Form.Label>
            <Form.Control
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
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